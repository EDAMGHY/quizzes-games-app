import {
  pgTable,
  timestamp,
  serial,
  varchar,
  boolean,
  text,
  primaryKey,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// Enums
const Role = pgEnum("Role", ["USER", "ADMIN"]);
const QuestionType = pgEnum("QuestionType", ["RADIO", "CHECKBOX"]);
// const PerkType = pgEnum("PerkType", [
//   "AVATAR",
//   "THEME",
//   "BADGE",
//   "TITLE",
//   "QUIZ_ACCESS",
//   "MULTIPLIER",
//   "BOOST",
//   "LEADERBOARD_PRIVILEGE",
//   "EXTRA_ATTEMPT",
//   "COMMUNITY_FEATURE",
// ]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: Role("role").notNull().default("USER"),
});

export const quizzes = pgTable("quizzes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const questions = pgTable("questions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  quizId: text("quizId")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  type: QuestionType("type").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const options = pgTable("options", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  questionId: text("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const answers = pgTable("answers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  questionId: text("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // selectedOptions: array(text("selectedOptions")).notNull(), // Array of Option ids
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);
