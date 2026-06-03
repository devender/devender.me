---
title: "YAY ! Java  Erlang"
date: 2007-11-15T17:00:05-07:00
slug: "yay-java-erlang"
wpUrl: "http://devender.me/2007/11/15/yay-java-erlang/"
categories: ["General"]
---

Now that I got OtpErlang.jar (see my previous post), my next step was to connect Java to Erlang, if you have been following the book, you would have come across the Name server example in Chapter 10, this java code will connect to the name server

`static void store(OtpConnection connection) throws Exception {  
OtpErlangObject[] elements = new OtpErlangObject[] {  
new OtpErlangString("weather"), new OtpErlangString("very nice") };  
OtpErlangList erlangList = new OtpErlangList(elements);  
connection.sendRPC("kvs", "store", erlangList);  
OtpErlangObject received = connection.receiveRPC();  
System.out.println(received);  
}`

static void lookup(OtpConnection connection) throws Exception {  
OtpErlangObject[] elements = new OtpErlangObject[] { new OtpErlangString(  
“weather”) };  
OtpErlangList erlangList = new OtpErlangList(elements);  
connection.sendRPC(“kvs”, “lookup”, erlangList);  
OtpErlangObject received = connection.receiveRPC();  
System.out.println(received);  
}

public static void main(String[] args) throws Exception {  
OtpSelf self = new OtpSelf(“client”);  
OtpPeer other = new OtpPeer(“gandalf@devender-laptop”);  
OtpConnection connection = self.connect(other);

store(connection);  
lookup(connection);  
}
