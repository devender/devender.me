---
title: "Dabbling with Ruby"
date: 2005-12-19T06:16:11+00:00
slug: "dabbling-with-ruby"
wpUrl: "http://devender.me/2005/12/19/dabbling-with-ruby/"
categories: ["Tech"]
---

Started dabbling with Ruby this weekend, after a colleague introduced me to it,

I am amazed at some of the features in Ruby.

It was easy to start off, just used the [one click windows installer](http://rubyinstaller.rubyforge.org/wiki/wiki.pl),

then installed the [eclipse RDT](http://sourceforge.net/projects/rubyeclipse)  and I was up and running.

My fist stab at it was, to use it to output every month start andend date

between 2 given dates

## Returns The number Of Days in a month

def numOfDaysInMonth(date)

if(date.strftime(“%m”)==”02″)

if(date.leap?)

return 29

else

return 28

end

else

monthDaysMap = {“01″=>31,”03″=>31,”04″=>30,”05″=>31,”06″=>30,”07″=>31,”08″=>31,

“09”=>30,”10″=>31,”11″=>30,”12″=>31}

return monthDaysMap[date.strftime(“%m”)]

end

end

# Yields Each Month(start and end Date) between 2 given dates

def eachMonth(startDate,endDate)

while(startDate < endDate)

newDate = startDate+(numOfDaysInMonth(startDate)-1)

yield(startDate,newDate)

startDate = newDate + 1

end

end

And the next was to print start and end date of each year in 2 given dates

# Returns the number of Days in a year

def numOfDaysInYear(date)

if(date.leap?)

return 366

else

return 365

end

end

#Yields each year (start and end date) between 2 given dates

def eachYear(startDate,endDate)

while(startDate < endDate)

newDate = startDate+(numOfDaysInYear(startDate)-1)

yield(startDate,newDate)

startDate = newDate + 1

end

end

and some tests

eachMonth(Date.new(2000,01,01),Date.new(2005,01,01)){|startDate,endDate|

puts startDate.to\_s()+” “+endDate.to\_s()

}

eachYear(Date.new(2000,01,01),Date.new(2005,01,01)){|startDate,endDate|

puts startDate.to\_s()+” “+endDate.to\_s()

}

The output

2005-01-01 2005-01-31

2005-02-01 2005-02-28

2005-03-01 2005-03-31

2005-04-01 2005-04-30

2005-05-01 2005-05-31

2005-06-01 2005-06-30

2005-07-01 2005-07-31

2005-08-01 2005-08-31

2005-09-01 2005-09-30

2005-10-01 2005-10-31

2005-11-01 2005-11-30

2005-12-01 2005-12-31

2000-01-01 2000-12-31

2001-01-01 2001-12-31

2002-01-01 2002-12-31

2003-01-01 2003-12-31

2004-01-01 2004-12-31
