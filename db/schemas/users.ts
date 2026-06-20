import { pgTable, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  googleId: text('google_id').unique(),
  passwordHash: text('password_hash'),
  credits: integer('credits').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const unlockedPages = pgTable('unlocked_pages', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  pageSlug: text('page_slug').notNull(), // 'fps' | 'input-delay' | 'network' | 'registry' | 'fortnite' | 'all'
  unlockedAt: timestamp('unlocked_at').notNull().defaultNow(),
})

export const creditTransactions = pgTable('credit_transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  amount: integer('amount').notNull(), // positive = earned, negative = spent
  reason: text('reason').notNull(), // 'signup_bonus' | 'purchase' | 'unlock_page'
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const stripeOrders = pgTable('stripe_orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  productType: text('product_type').notNull(), // 'page_fps' | 'page_bundle' etc
  amountCents: integer('amount_cents').notNull(),
  status: text('status').notNull().default('pending'), // 'pending' | 'paid' | 'failed'
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
