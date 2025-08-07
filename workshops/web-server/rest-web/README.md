# RestWeb

## HTTP2 & OpenSSL

In order to create certificates to create a secure Rest Server you can use OpenSSL. The
command used to create self signed certificates is:

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

Put the generated certificates in the `certificates/` folder and start the Rest Server.
