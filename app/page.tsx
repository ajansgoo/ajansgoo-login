"use client"

import { useState } from "react"
import { api } from "@/lib/api" // 🔥 yeni eklediğimiz api.ts dosyasından çekiyoruz
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone || !password) {
      setError("Telefon ve şifre gereklidir.")
      return
    }

    const phoneRegex = /^05\d{9}$/
    if (!phoneRegex.test(phone)) {
      setError("Telefon numarası geçersiz.")
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await api("login", "POST", {
        phone: phone,
        password: password
      })

      console.log(response)
      alert("Giriş başarılı!")

      // ➡️ İstersen burada kullanıcıyı yönlendirebiliriz.
      // örnek: router.push("/dashboard")

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm p-6 rounded-2xl shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="text"
                placeholder="05xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="Şifreniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
