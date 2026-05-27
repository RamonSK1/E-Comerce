import 'dotenv/config'
import { db } from './connection'

async function migrate() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL
    );
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      category_id UUID NOT NULL REFERENCES categories(id)
    );
  `)

  console.log('Tabelas criadas com sucesso!')
  await db.end()
}

migrate().catch(console.error)