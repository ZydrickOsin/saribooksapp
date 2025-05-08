<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="6">
          <v-card-title class="text-h6 text-green-darken-3">Profile Settings</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ user?.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Created At</v-list-item-title>
                  <v-list-item-subtitle>{{ user?.created_at }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-text-field
              v-model="name"
              label="Display Name"
              class="mt-4"
              placeholder="Optional"
            />
            <v-btn color="primary" @click="updateProfile" class="me-2">Save</v-btn>
            <v-btn color="grey" @click="logout">Logout</v-btn>
            <v-divider class="my-4" />
            <v-btn color="error" @click="deleteAccount">Delete Account</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const user = ref(null)
const name = ref('')

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  if (!data.user) return router.push('/login')
  user.value = data.user
  name.value = data.user.user_metadata?.name || ''
})

const updateProfile = async () => {
  const { error } = await supabase.auth.updateUser({ data: { name: name.value } })
  alert(error ? 'Error updating profile' : 'Profile updated!')
}

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const deleteAccount = async () => {
  alert('Account deletion must be handled manually in Supabase dashboard.')
}
</script>