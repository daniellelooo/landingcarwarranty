import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet, LeadData } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = [
      "first_name", "last_name", "email", "phone",
      "vehicle_year", "vehicle_make", "vehicle_model",
      "mileage", "state", "zip_code", "has_warranty", "best_time_to_call",
    ];

    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Field "${field}" is required.` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const searchParams = request.nextUrl.searchParams;

    const lead: LeadData = {
      first_name: String(body.first_name).trim(),
      last_name: String(body.last_name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: String(body.phone).trim(),
      vehicle_year: String(body.vehicle_year),
      vehicle_make: String(body.vehicle_make),
      vehicle_model: String(body.vehicle_model).trim(),
      mileage: String(body.mileage),
      state: String(body.state),
      zip_code: String(body.zip_code).trim(),
      has_warranty: String(body.has_warranty),
      best_time_to_call: String(body.best_time_to_call),
      heard_about_us: body.heard_about_us ? String(body.heard_about_us) : undefined,
      ip_address: ip,
      utm_source: searchParams.get("utm_source") || body.utm_source || undefined,
      utm_campaign: searchParams.get("utm_campaign") || body.utm_campaign || undefined,
    };

    await appendLeadToSheet(lead);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
