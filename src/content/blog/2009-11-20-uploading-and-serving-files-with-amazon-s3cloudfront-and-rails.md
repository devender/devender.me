---
title: "Uploading and Serving files with Amazon S3/CloudFront and Rails"
date: 2009-11-20T13:10:35-08:00
slug: "uploading-and-serving-files-with-amazon-s3cloudfront-and-rails"
wpUrl: "http://devender.me/2009/11/20/uploading-and-serving-files-with-amazon-s3cloudfront-and-rails/"
categories: ["General"]
---

The [attachment\_fu](http://github.com/technoweenie/attachment_fu) plugin written by technoweenie takes care of uploading and retrieving files using S3 and CloudFront, it has other options too such has saving to the database, local file system, rack space. Anyways in this post I describe how to use the plugin with S3 and CloudFront

1. Create a sample rails project.
2. Install aws-s3 gem, ‘*sudo gem install aws-s3*‘.
3. Install attachment\_fu plugin “*./script/plugin install git://github.com/technoweenie/attachment\_fu.git*“.
4. Assuming that you already have an Amazon S3 account, create a new S3 bucket.
5. Next step is to sign up for the Amazon [CloudFront](http://aws.amazon.com/cloudfront/), this is Amazon’s [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) and like any other AWS you pay for what you use, in addition it integrates with your S3 buckets.
6. Now log into the CloudFront’s [console](http://aws.amazon.com/cloudfront/) and create a new distribution channel that is backed with the S3 bucket created in above steps.
7. Rename amazon\_s3.yml.tpl to amazon\_s3.yml (it will be in your config folder)
8. Edit the amazon\_s3.yml file and fill in the appropriate information.
9. Make a model ‘./script/generate model file\_meta\_data size:integer content\_type:string filename:string’ .
10. Edit the newly created model and add the following lines to it.( ‘has\_attachment’ and ‘validated\_as\_attachment’ are provided by the plugin, there are many other options that you can specify to read more on the options refer to this [page](http://github.com/technoweenie/attachment_fu)).

```

has_attachment   :storage =&gt; :s3,
:cloudfront => true
validates_as_attachment
```

11. Generate controller ‘./script/generate controller Upload index show new edit create update destroy’.
12. Edit the Upload controller and add the following

```

def index
  @fileMetaDatas = FileMetaData.all
end
def new
  @fileMetaData = FileMetaData.new
end
def create
  @fileMetaData = FileMetaData.new(params[:fileMetaData])
  if @fileMetaData.save
    flash[:notice] = 'File was successfully created.'
    redirect_to :controller => :upload, :action => :index
  else
    render :action => :new
  end
end
```

13. Edit the new.erb.html file under the upload controller folder and add the following

```

<form_for(:fileMetaData, :url => upload_file_path, :html => { :multipart => true }) do |f| >

Upload A File:
<%= f.file_field :uploaded_data %>
<%= submit_tag 'Create' %>
<% end -%>
```

14. Edit the index.html.erb file under the Uploads controller and add the following

```

File List
<% for fileMetaData in @fileMetaDatas -%>
<%= link_to fileMetaData.public_filename,fileMetaData.public_filename %>
<% end %>

```

15. Edit the Routes and add this new route “*map.upload\_file ‘/new’, :controller => ‘upload’, :action => ‘create’*“
16. Run migrations
17. And run the server, that’s it now you browse to <http://localhost:3000/upload/new> to upload a file.
