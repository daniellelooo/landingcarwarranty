export interface LeadData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  mileage: string;
  state: string;
  zip_code: string;
  has_warranty: string;
  best_time_to_call: string;
  heard_about_us?: string;
  ip_address?: string;
  utm_source?: string;
  utm_campaign?: string;
}

export async function appendLeadToSheet(data: LeadData): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_SECRET,
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook responded with ${response.status}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || "Google Sheets webhook reported failure.");
  }
}
