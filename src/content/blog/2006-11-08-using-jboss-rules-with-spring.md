---
title: "Using Jboss Rules With Spring"
date: 2006-11-08T06:30:06+00:00
slug: "using-jboss-rules-with-spring"
wpUrl: "http://devender.me/2006/11/08/using-jboss-rules-with-spring/"
categories: ["Tech"]
---

<http://wiki.jboss.org/wiki/Wiki.jsp?page=RulesWithSpringFramework> is an excellent article on how to do this. I have made some slight modifications to this to use excel files instead of drl files and pass in a path rather than specify each file individually. Here is the code and configuration

<bean id=”huntGroupRuleBase” class=”edu.apollogrp.qtask.routing.util.RuleBaseBeanFactory”>  
<property name=”drlResourcePath” value=”classpath:hunt-group-rules/\*.xls”/>  
<property name=”packageBuilderConfiguration”>  
<bean class=”org.drools.compiler.PackageBuilderConfiguration”>  
<!–<property name=”compiler” value=”PackageBuilderConfiguration.JANINO”/> –>  
<property name=”compiler” value=”1″/>  
</bean>  
</property  
</bean>

package edu.apollogrp.qtask.routing.util;

import java.io.InputStreamReader;  
import java.io.Reader;  
import java.io.StringReader;  
import java.util.List;

import org.apache.log4j.Logger;  
import org.drools.RuleBase;  
import org.drools.RuleBaseFactory;  
import org.drools.compiler.PackageBuilder;  
import org.drools.compiler.PackageBuilderConfiguration;  
import org.drools.decisiontable.InputType;  
import org.drools.decisiontable.SpreadsheetCompiler;  
import org.springframework.beans.BeansException;  
import org.springframework.beans.factory.FactoryBean;  
import org.springframework.beans.factory.InitializingBean;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.ApplicationContextAware;  
import org.springframework.core.io.Resource;  
import org.springframework.util.Assert;

/\*\*  
\* @author Geoffrey De Smet  
\* @see <http://wiki.jboss.org/wiki/Wiki.jsp?page=RulesWithSpringFramework>  
 \*  
\*/  
public class RuleBaseBeanFactory implements FactoryBean, InitializingBean,  
ApplicationContextAware {

private static final Logger log = Logger  
.getLogger(RuleBaseBeanFactory.class);

private String drlResourcePath;

private RuleBase ruleBase;

private PackageBuilderConfiguration packageBuilderConfiguration;

private ApplicationContext applicationContext;

public void afterPropertiesSet() throws Exception {  
Resource[] drlResourceList = applicationContext  
.getResources(drlResourcePath);

Assert.notEmpty(drlResourceList, “drlResourceList must not be empty”);

PackageBuilder builder = (packageBuilderConfiguration != null ? new PackageBuilder(  
packageBuilderConfiguration)  
: new PackageBuilder());

SpreadsheetCompiler compiler = new SpreadsheetCompiler();

for (Resource resource : drlResourceList) {  
log.info(“Reading file: ” + resource.getFilename());

Reader input = null;

// check the extension to see if this is a decision table or regular  
// drl  
if (resource.getFilename().endsWith(“drl”)) {  
input = new InputStreamReader(resource.getInputStream());  
} else if (resource.getFilename().endsWith(“xls”)) {  
String drl = compiler.compile(resource.getInputStream(),  
InputType.XLS);  
log.debug(drl);  
input = new StringReader(drl);  
} else {  
log.warn(“Drools resource has unknown file type: ”  
+ resource.getFilename());  
}  
if (input != null) {  
builder.addPackageFromDrl(input);  
}  
}  
ruleBase = RuleBaseFactory.newRuleBase();  
ruleBase.addPackage(builder.getPackage());  
}

public RuleBase getObject() {  
return ruleBase;  
}

public Class getObjectType() {  
return RuleBase.class;  
}

public boolean isSingleton() {  
return true;  
}

public void setPackageBuilderConfiguration(  
PackageBuilderConfiguration packageBuilderConfiguration) {  
this.packageBuilderConfiguration = packageBuilderConfiguration;  
}

public void setApplicationContext(ApplicationContext applicationContext)  
throws BeansException {  
this.applicationContext = applicationContext;  
}

public void setDrlResourcePath(String drlResourcePath) {  
this.drlResourcePath = drlResourcePath;  
}

}
