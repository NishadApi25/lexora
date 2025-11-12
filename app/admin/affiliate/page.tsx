import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/en/admin/affiliate');  // replace 'en' with your default locale
}