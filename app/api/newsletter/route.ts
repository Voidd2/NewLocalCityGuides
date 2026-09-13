import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const file = path.join(dataDir, 'newsletter.json');
    const existing: string[] = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf-8'))
      : [];
    if (!existing.includes(email)) {
      existing.push(email);
      fs.writeFileSync(file, JSON.stringify(existing, null, 2));
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
