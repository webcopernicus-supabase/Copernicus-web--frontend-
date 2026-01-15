import type { Metadata } from "next"
import { ContactClientPage } from "./contactClient"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Copernicus to discuss your project. We're here to help you elevate your brand with strategic thinking and creative excellence.",
}

export default function ContactPage() {
  return <ContactClientPage />
}
