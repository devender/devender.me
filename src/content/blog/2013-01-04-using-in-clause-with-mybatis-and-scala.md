---
title: "Using In Clause with MyBatis and Scala"
date: 2013-01-04T13:40:12-08:00
slug: "using-in-clause-with-mybatis-and-scala"
wpUrl: "http://devender.me/2013/01/04/using-in-clause-with-mybatis-and-scala/"
categories: ["General"]
---

Had a bit of struggle to get this to work, logging the solution here so that it will be helpful to someone else. I am using Scala 2.9.1 and [mybatis-scala-core](http://mybatis.org/scala/) 1.0.0.

```scala
val findOpenGroups = new SelectListBy[GroupIds,Group] {
def xsql = SELECT h.xxxxxx AS id,
h.xxxxxx AS launchedDate
FROM USA_xxxx_xxxx_xxxx h
WHERE h.new_status = 'Open'
AND h.id IN
<foreach item="item" collection="ids" open="(" separator="," close=")"> 
                {"#{item}"}
            </foreach> 
}
```

GroupIds is a simple class, just make sure you are using the java.util.List.

```scala

class GroupIds(val ids:java.util.List[Int]){}
```

**UPDATE**  
Frank Martínez pointed out to me that you can also do `{"item" ?}` instead of `{"#{item}"}` but you will need to import `org.mybatis.scala.mapping.Binding._` Thanks Frank.
