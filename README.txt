HISTORY:
========
08 May 2012: Initial edit and release

SUMMARY:
========
This is a set of node.js / cloud9 /bonescript files that where written 
to produce a POST server on the TI BeagleBone (BBone).


Contents:
=========
- server (run on BBone using cloud9)
  - index.js           :  main file - run this file to start the POST server
  - server.js          :  creates the actual server
  - router.js          :  routes request to handler or 404 page
  - requestHandler.js  :  file with all of the handlers

- client (run on remote system using a web browser)
  - test.html          : test page for remote browser
  - analog.html        : iframe page to display analogs every 5 seconds
  - input.html         : iframe page to display digital inputs every second


Use:
====
1) Put the files in the server directory on a BBone in cloud9 under 
   a single directory.
2) RUN the index.html file.
3) On your remote system, put the files under the client directory
   in a single directory.
4) Start a web browser and load the test.html page.


FUNCTIONS:
==========

POST commands:
--------------
analogRead() interface:
 - http://<BBone IP>:8888/analog?pin=[0-7]
   example:  http://192.168.1.119:8888/analog?pin=0

pinMode() interface:
 - http://<BBone IP>:8888/init?pin=[see below]&value=[INPUT,OUTPUT]
   example:  http://192.168.1.119:8888/init?pin=P8_43&value=OUTPUT

digitalWrite() interface:
 - http://<BBone IP>:8888/input?pin=[see below]
   example:  http://192.168.1.119:8888/input?pin=P8_42

digitalRead() interface:
 - http://<BBone IP>:8888/output?pin=[see below]&value=[HIGH,LOW,0,1]
   example:  http://192.168.1.119:8888/output?pin=USR3&value=HIGH

shiftOut() interface (SPI using digital outputs):
 - http://<BBone IP>:8888/shift?data=[see below]&clock=[see below]&order=[LSBFIRST,MSBFIRST]&value=[0-0xff]
   example:  http://192.168.1.119:8888/shift?data=P8_43&clock=P8_44&order=LSBFIRST&value=0x20

Client javascript commands:
---------------------------
return = analog(value) - value=(0 to 0xff) ; return=(0 to 0xfff)

init(pin,dir) - pin=(see below) ; dir=(INPUT or OUTPUT)

digout(pin,value) - pin=(see below) ; value=(HIGH, LOW, 0 or 1)

return = digin(pin) - pin=(see below) ; return=(0 or 1)

shiftout(data,clock,order,value) - data=(see below) ; clock=(see below) ; 
		order=(LSBFIRST or MSBFIRST) ; value=(0 to 0xff)

Pin Names:
----------
Possible "pin" names for init, output, input, shiftOut POST requests and
init, digin, digout, shiftout and analog client javascript commands.

NOTE: Depending on Linux configuration, some of these pins maybe used by
other drivers or system functions.

    "pin"       SIGNAL        CONNECTOR PIN
   ======      =========      =============
    P8_3       "GPIO1_6"           26
    P8_4       "GPIO1_7"           27
    P8_5       "GPIO1_2"           22
    P8_6       "GPIO1_3"           23
    P8_7       "TIMER4"            41
    P8_8       "TIMER7"            44
    P8_9       "TIMER5"            42
    P8_10      "TIMER6"            43
    P8_11      "GPIO1_13"          29
    P8_12      "GPIO1_12"          28
    P8_13      "EHRPWM2B"          15
    P8_14      "GPIO0_26"          16
    P8_15      "GPIO1_15"          31
    P8_16      "GPIO1_14"          30
    P8_17      "GPIO0_27"          17
    P8_18      "GPIO2_1"           40
    P8_19      "EHRPWM2A"          14
    P8_20      "GPIO1_31"          39
    P8_21      "GPIO1_30"          38
    P8_22      "GPIO1_5"           25
    P8_23      "GPIO1_4"           24
    P8_24      "GPIO1_1"           21
    P8_25      "GPIO1_0"           20
    P8_26      "GPIO1_29"          37
    P8_27      "GPIO2_22"          57
    P8_28      "GPIO2_24"          59
    P8_29      "GPIO2_23"          58
    P8_30      "GPIO2_25"          60
    P8_31      "UART5_CTSN"         7
    P8_32      "UART5_RTSN"         8
    P8_33      "UART4_RTSN"         6
    P8_34      "UART3_RTSN"        56
    P8_35      "UART4_CTSN"         5
    P8_36      "UART3_CTSN"        55
    P8_37      "UART5_TXD"         53
    P8_38      "UART5_RXD"         54
    P8_39      "GPIO2_12"          51
    P8_40      "GPIO2_13"          52
    P8_41      "GPIO2_10"          49
    P8_42      "GPIO2_11"          50
    P8_43      "GPIO2_8"           47
    P8_44      "GPIO2_9"           48
    P8_45      "GPIO2_6"           45
    P8_46      "GPIO2_7"           46

    P9_11      "UART4_RXD"         18
    P9_12      "GPIO1_28"          36
    P9_13      "UART4_TXD"         19
    P9_14      "EHRPWM1A"          34
    P9_15      "GPIO1_16"          32
    P9_16      "EHRPWM1B"          35
    P9_17      "I2C1_SCL"           3
    P9_18      "I2C1_SDA"           2
    P9_19      "I2C2_SCL"           9
    P9_20      "I2C2_SDA"          10
    P9_21      "UART2_TXD"          1
    P9_22      "UART2_RXD"          0
    P9_23      "GPIO1_17"          33
    P9_24      "UART1_TXD"         12
    P9_25      "GPIO3_21"          66
    P9_26      "UART1_RXD"         11
    P9_27      "GPIO3_19"          64
    P9_28      "SPI1_CS0"          63
    P9_29      "SPI1_D0"           61
    P9_30      "SPI1_D1"           62
    P9_31      "SPI1_SCLK"         65
    P9_41      "CLKOUT2"           13
    P9_42      "GPIO0_7"            4

    USR0       "USR0"              n/a (user LED)
    USR1       "USR1"              n/a (user LED)
    USR2       "USR2"              n/a (user LED)
    USR3       "USR3"              n/a (user LED)

LICENSE:
========
//
// Copyright (C) 2012 - Cabin Programs, Ken Keller 
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

