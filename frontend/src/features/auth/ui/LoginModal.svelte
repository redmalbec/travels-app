<script lang="ts">
  export let onSuccess: () => void;

  let username = '';
  let password = '';
  let error = '';

  async function handleLogin() {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.ok) {
      onSuccess();
    } else {
      error = 'Неверные учетные данные';
    }
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="w-80 rounded-lg bg-white p-6 shadow-xl">
    <h2 class="mb-4 text-lg font-bold">Login</h2>
    <input
      bind:value={username}
      placeholder="Username"
      class="mb-2 w-full rounded border p-2"
    />
    <input
      bind:value={password}
      type="password"
      placeholder="Password"
      class="mb-2 w-full rounded border p-2"
    />
    {#if error}
      <p class="mb-2 text-sm text-red-500">{error}</p>
    {/if}
    <button
      on:click={handleLogin}
      class="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
    >
      Sign in
    </button>
  </div>
</div>