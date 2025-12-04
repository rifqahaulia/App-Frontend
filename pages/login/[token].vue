<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const { setTokens } = useAuth();
const route = useRoute();
const router = useRouter();

definePageMeta({
  layout: false,
  ssr: false,
});

onMounted(async () => {
  const token = route.params.token as string;
  console.log("Token handler mounted dengan token:", token?.substring(0, 20) + "...");

  if (token) {
    try {
      // Verify token langsung
      console.log("Memverifikasi token...");
      const res: any = await $fetch(
        "https://auth.airnavindonesia.co.id/user/verify-token",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Verify response:", res);

      if (res?.status === "success") {
        console.log("Token valid, menyimpan dan redirect");
        setTokens(token);
        // Tunggu sebentar untuk memastikan cookie tersimpan
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Redirecting to dashboard...");
        router.push("/dashboard");
      } else {
        console.error("Token tidak valid dari server");
        router.push("/login?error=invalid_token");
      }
    } catch (err) {
      console.error("Verifikasi gagal:", err);
      router.push("/login?error=server_error");
    }
  } else {
    console.error("Tidak ada token di params");
    router.push("/login?error=no_token");
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Memproses login...</p>
      <p class="text-sm text-gray-400 mt-2">Mohon tunggu sebentar</p>
    </div>
  </div>
</template>
