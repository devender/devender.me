---
title: "Reading and Writing Java Property Files With Ruby"
date: 2006-05-01T06:20:11+00:00
slug: "reading-and-writing-java-property-files-with-ruby"
wpUrl: "http://devender.me/2006/05/01/reading-and-writing-java-property-files-with-ruby/"
categories: ["General", "Tech"]
---

Created a simple Class in ruby to help reading and writing property files

class JavaProps  
attr :file, :properties

#Takes a file and loads the properties in that file  
 def initialize file  
@file = file  
@properties = {}  
IO.foreach(file) do |line|  
@properties[$1.strip] = $2 if line =~ /([^=]\*)=(.\*)\/\/(.\*)/ || line =~ /([^=]\*)=(.\*)/  
end  
end

#Helpfull to string  
def to\_s  
output = “File Name [#{@file](mailto:#%7B@file)} \n”  
@properties.each {|key,value| output += ” #{key}= #{value} \n” }  
output  
end

#Write a property  
def write\_property (key,value)  
@properties[key] = value  
end

#Save the properties back to file  
 def save  
file = File.new(@file,”w+”)  
@properties.each {|key,value| file.puts “#{key}=#{value}\n” }  
end

end
