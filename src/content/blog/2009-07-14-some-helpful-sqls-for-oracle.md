---
title: "Some helpful Sqls for Oracle"
date: 2009-07-14T15:50:48-08:00
slug: "some-helpful-sqls-for-oracle"
wpUrl: "http://devender.me/2009/07/14/some-helpful-sqls-for-oracle/"
categories: ["General"]
---

1. For finding out the current running sql for a particular user

```sql
SELECT a.sql_text
 FROM v$session s,
 v$sqlarea a
 WHERE s.user    = 'USER'
AND s.status        ='ACTIVE'
AND s.sql_hash_value=a.hash_value
AND s.sql_address   =a.address;
```

2. [To find locked objects in Oracle](http://www.praetoriate.com/oracle_tips_find_locks.htm)

3. To see all the seesion for a user

```sql
   select * from v$session s where s.username = 'PROQ';
```

4. To see locked objects and the session

```sql
select     oracle_username || ' (' || s.osuser || ')' username
   ,  s.sid || ',' || s.serial# sess_id
   ,  owner || '.' || object_name object
   ,  object_type
   ,  decode( l.block
      ,       0, 'Not Blocking'
      ,       1, 'Blocking'
      ,       2, 'Global') status
   ,  decode(v.locked_mode
     ,       0, 'None'
     ,       1, 'Null'
     ,       2, 'Row-S (SS)'
     ,       3, 'Row-X (SX)'
     ,       4, 'Share'
     ,       5, 'S/Row-X (SSX)'
     ,       6, 'Exclusive', TO_CHAR(lmode)) mode_held
  from       v$locked_object v
  ,  dba_objects d
  ,  v$lock l
  ,  v$session s
  where      v.object_id = d.object_id
  and        v.object_id = l.id1
  and        v.session_id = s.sid
  order by oracle_username
  ,  session_id
```

And then kill the session with this

```sql
alter system kill session '94,2168';
```

5. Tables by user

```sql
select owner,count(*) from all_all_tables group by owner;
```
