import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  companyName?: string;
};

function validate(payload: ContactPayload) {
  if (!payload.name || payload.name.trim().length < 2) return "姓名至少为2个字符";
  if (!payload.phone || !/^1\d{10}$/.test(payload.phone.trim())) return "请输入有效的手机号";
  if (!payload.companyName || payload.companyName.trim().length < 2) return "公司名称至少为2个字符";
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) return "请输入有效的邮箱";
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const error = validate(payload);

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  console.log("[contact-form]", {
    ...payload,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
