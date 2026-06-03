---
title: "Use Ruby to Prefix all lines /Postfix all lines/Remove empty lines/Replace strings in all lines of a file"
date: 2006-12-16T00:57:06+00:00
slug: "use-ruby-to-prefix-all-lines-postfix-all-linesremove-empty-linesreplace-strings-in-all-lines-of-a-file"
wpUrl: "http://devender.me/2006/12/16/use-ruby-to-prefix-all-lines-postfix-all-linesremove-empty-linesreplace-strings-in-all-lines-of-a-file/"
categories: ["General", "ruby", "Tech"]
---

For some reason or the other I had to do bulk operations on files, like prefix/postfix all lines or remove empty lines  
, yeah I could do it with some unix command, but I am already using ruby to massage the data just wanted to extand that.So here  
is what I did wrote a ruby script to do it now I can do stuff like

prefix ( ‘c:\tmp\zip.txt’,’some-prefix’ )

The script, hmmm I wonder if I could submit this to ruby people.

`require 'fileutils'`  
 `module DevFileutils  
include FileUtils::Verbose` `# Opens a file and adds prefix to each line  
def prefix file_name, prefix  
temp = File.new(file_name+".tmp", 'a+')  
IO.foreach(file_name) do |line|  
temp.puts prefix + line  
end  
temp.close  
mv file_name+'.tmp', file_name  
end` `# Opens a file and adds postfix to each line  
def postfix file_name, postfix  
temp = File.new(file_name+".tmp", 'a+')  
IO.foreach(file_name) do |line|  
temp.puts line.chomp + postfix  
end  
temp.close  
mv file_name+'.tmp', file_name  
end` `#removes all empty lines from a file  
def remove_empty_lines file_name  
temp = File.new(file_name+".tmp", 'a+')  
IO.foreach(file_name) do |line|  
temp.puts line if !line.chomp.empty?  
end  
temp.close  
mv file_name+'.tmp', file_name  
end` `def replace file_name,string,with_string  
temp = File.new(file_name+".tmp", 'a+')  
IO.foreach(file_name) do |line|  
temp.puts line.gsub(string,with_string)  
end  
temp.close  
mv file_name+'.tmp', file_name  
end  
end`
