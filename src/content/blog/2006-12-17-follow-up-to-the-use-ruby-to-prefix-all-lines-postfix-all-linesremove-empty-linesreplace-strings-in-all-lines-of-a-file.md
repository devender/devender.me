---
title: "Follow up to the Use Ruby to Prefix all lines /Postfix all lines/Remove empty lines/Replace strings in all lines of a file"
date: 2006-12-17T20:21:06+00:00
slug: "follow-up-to-the-use-ruby-to-prefix-all-lines-postfix-all-linesremove-empty-linesreplace-strings-in-all-lines-of-a-file"
wpUrl: "http://devender.me/2006/12/17/follow-up-to-the-use-ruby-to-prefix-all-lines-postfix-all-linesremove-empty-linesreplace-strings-in-all-lines-of-a-file/"
categories: ["General"]
---

In my [previous post](https://devender.wordpress.com/2006/12/16/use-ruby-to-prefix-all-lines-postfix-all-linesremove-empty-linesreplace-strings-in-all-lines-of-a-file/), I showed a ruby program that can help you iterate over lines of a file and make changes to the file, here I rewritten the code in a much more ruby-way, where I am using code blocks and iterators take a look  
module DevFileutils  
include FileUtils::Verbose

# Open file, iterate through each line and yield on each line, take results of yield  
def each\_line\_of\_file file\_name  
temp = File.new(file\_name+”.tmp”, ‘a+’)  
IO.foreach(file\_name) do |line|  
value = yield(line)  
temp.puts yield(line) if value  
end  
temp.close  
mv file\_name+’.tmp’, file\_name  
end

# Opens a file and adds prefix to each line  
def prefix  file\_name, prefix  
each\_line\_of\_file(file\_name) { |line| prefix + line }  
end

# Opens a file and adds postfix to each line  
def postfix file\_name, postfix  
each\_line\_of\_file(file\_name) { |line| line.chomp + postfix }  
end

#removes all empty lines from a file  
def remove\_empty\_lines file\_name  
each\_line\_of\_file(file\_name) { |line| line if !line.chomp.empty? }  
end

def replace file\_name,string,with\_string  
each\_line\_of\_file(file\_name) { |line| line.gsub(string,with\_string) }  
end  
end
