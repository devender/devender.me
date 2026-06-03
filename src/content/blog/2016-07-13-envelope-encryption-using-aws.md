---
title: "Envelope Encryption using AWS"
date: 2016-07-13T14:48:14-08:00
slug: "envelope-encryption-using-aws"
wpUrl: "http://devender.me/2016/07/13/envelope-encryption-using-aws/"
categories: ["General"]
---

Please see my previous [post](http://devender.me/2016/07/13/envelope-encryption/) on what is [Envelope Encryption](http://devender.me/2016/07/13/envelope-encryption/).

This post is about how to leverage AWS key management system to do envelope encryption. All code used in this post is available on [GitHub](https://github.com/devender/envelope-encryption-aws).

You will need the following:

1. An AWS account.
2. aws\_access\_key and aws\_secret\_access\_key either for the root aws account or an individual account which has full access to AWS.
3. Create a master key to be used for this example.
   1. You can create a master key by logging into aws console , go to the IAM section and then choose Encryption Keys in the left hand menu.
   2. Pick any region you want and create a key.
   3. Note the ARN for the newly created key, it will look something like this “arn:aws:kms:us-west-1:324671914464:key/510f222f-fbb8-46aa-9408-a329fbb15575”

Steps to encrypt ([EnvelopeEncryptionService.java](https://github.com/devender/envelope-encryption-aws/blob/master/src/main/java/com/gdr/aws/kms/EnvelopeEncryptionService.java))

1. Using AWS API, send a request to generate data keys.
2. AWS will return the data key both in plain text and encrypted format.
3. Using the plain text, encrypt your message.
4. Base64 encode the encrypted message.
5. Save both the encrypted message and the encrypted data key.

```java
private GenerateDataKeyResult generateDataKey() {
        GenerateDataKeyRequest generateDataKeyRequest = new GenerateDataKeyRequest();
        generateDataKeyRequest.setKeyId(clientMasterKeyId);
        generateDataKeyRequest.setKeySpec(DataKeySpec.AES_128);
        GenerateDataKeyResult dataKeyResult = awskmsClient.generateDataKey(generateDataKeyRequest);
        return dataKeyResult;
    }

    private EnvelopeEncryptedMessage encryptMessage(final String message, final GenerateDataKeyResult dataKey) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        SecretKeySpec key = new SecretKeySpec(dataKey.getPlaintext().array(), AES);
        Cipher cipher = Cipher.getInstance(AES);
        cipher.init(Cipher.ENCRYPT_MODE, key);

        byte[] enc = cipher.doFinal(message.getBytes());

        String cipherText = Base64.getEncoder().encodeToString(enc);

        EnvelopeEncryptedMessage envelope = new EnvelopeEncryptedMessage();
        envelope.setEncryptedKey(dataKey.getCiphertextBlob().array());
        envelope.setCiphertext(cipherText);
        return envelope;
    }
```

Steps to decrypt ([EnvelopeEncryptionService.java](https://github.com/devender/envelope-encryption-aws/blob/master/src/main/java/com/gdr/aws/kms/EnvelopeEncryptionService.java))

1. Extract the encrypted data key from the envelope.
2. Use AWS api to decrypt the data key.
3. Base64 decode the message.
4. Use the plain text key obtained in step 2 to decrypt the message from step 3.

```java
private String decrypt(final SecretKeySpec secretKeySpec, final String cipherText) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        byte[] decodeBase64src = Base64.getDecoder().decode(cipherText);
        Cipher cipher = Cipher.getInstance(AES);
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
        return new String(cipher.doFinal(decodeBase64src));
    }

    private SecretKeySpec decryptKey(final EnvelopeEncryptedMessage envelope) {
        ByteBuffer encryptedKey = ByteBuffer.wrap(envelope.getEncryptedKey());
        DecryptRequest decryptRequest = new DecryptRequest().withCiphertextBlob(encryptedKey);
        ByteBuffer plainTextKey = awskmsClient.decrypt(decryptRequest).getPlaintext();
        SecretKeySpec key = new SecretKeySpec(plainTextKey.array(), AES);
        return key;
    }
```

References:

<http://docs.aws.amazon.com/kms/latest/developerguide/programming-encryption.html>

<https://github.com/awslabs/aws-dynamodb-encryption-java>

<https://github.com/uzresk/aws-examples>
