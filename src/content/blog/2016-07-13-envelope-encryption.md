---
title: "Envelope Encryption"
date: 2016-07-13T14:18:21-08:00
slug: "envelope-encryption"
wpUrl: "http://devender.me/2016/07/13/envelope-encryption/"
categories: ["General"]
---

What is it ?

Envelope Encryption is an approach/process used within many applications to encrypt data. Using this approach your data is protected two-fold.

How does this work ?

* Typically there are many long term keys or master keys that is held in a key management system (KMS).
* When you need to encrypt some message :
  + A request is sent to the KMS to generate a data key  based on one of the master keys.
  + KMS returns a data key, which usually contains both the plain text version and the encrypted version of the data key.
  + The message is encrypted using the plain text key.
  + Then both the encrypted message and the encrypted data key are packaged into a structure (sometimes called envelope) and written.
  + The plain text key is immediately removed from memory.
* When it comes time to decrypt the message:
  + The encrypted data key is extracted from the envelope.
  + KMS is requested to decrypt the data key using the same master key as that was used to generate it.
  + Once the plain text version of the data key is obtained then the encrypted message itself is decrypted.

Using this approach if one wants to decrypt data, they need be authenticated with the KMS, since the master keys are only held there and never exported, and only the KMS can decrypt the data keys.

![image](/media/2016/07/image.png)

In the next post I will show how this can be done using AWS.

References:

[Click to access KMS-Cryptographic-Details.pdf](https://d0.awsstatic.com/whitepapers/KMS-Cryptographic-Details.pdf)

<http://www.druva.com/blog/druva-tech-moments-digital-envelope-encryption/>
