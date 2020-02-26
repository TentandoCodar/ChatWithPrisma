# Migration `20200225234159-init`

This migration has been generated at 2/25/2020, 11:41:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Message" (
    "content" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "user" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "email" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "name" text  NOT NULL DEFAULT '',
    "password" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200225234159-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,23 @@
+datasource db {
+    provider = "postgresql"
+    url = "postgresql://postgres:1234@localhost:5432/ChatWithPrisma"
+}
+
+
+model Message {
+    id Int @id @default(autoincrement())
+    content String
+    user User
+}
+
+model User {
+    id Int @id @default(autoincrement())
+    email String @unique
+    name String 
+    password String
+    messages Message[]
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
```


