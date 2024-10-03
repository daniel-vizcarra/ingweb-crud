<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="my-4 text-center">User Management</h1>
        <b-table striped hover :items="users" :fields="fields">
          <template #cell(actions)="data">
            <b-button size="sm" variant="warning" @click="editUser(data.item)">Edit</b-button>
            <b-button size="sm" variant="danger" @click="deleteUser(data.item.id)" class="ml-2">Delete</b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col>
        <h3>{{ editing ? 'Edit User' : 'Add User' }}</h3>
        <b-form @submit.prevent="handleSubmit">
          <b-form-group label="Username" label-for="username">
            <b-form-input id="username" v-model="userForm.username" required></b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="email">
            <b-form-input id="email" type="email" v-model="userForm.email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" type="password" v-model="userForm.password" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">{{ editing ? 'Update' : 'Create' }}</b-button>
          <b-button type="reset" variant="secondary" @click="resetForm" class="ml-2">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getUsers, createUser, updateUser, deleteUser } from '@/services/userService';

export default {
  data() {
    return {
      users: [],
      userForm: {
        id: null,
        username: '',
        email: '',
        password: ''
      },
      editing: false,
      fields: [
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'actions', label: 'Actions', class: 'text-center' }
      ]
    };
  },
  methods: {
    fetchUsers() {
      getUsers()
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    handleSubmit() {
      if (this.editing) {
        updateUser(this.userForm.id, this.userForm)
          .then(() => {
            this.fetchUsers();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        createUser(this.userForm)
          .then(() => {
            this.fetchUsers();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error creating user:', error);
          });
      }
    },
    editUser(user) {
      this.userForm = { ...user, password: '' };
      this.editing = true;
    },
    deleteUser(userId) {
      deleteUser(userId)
        .then(() => {
          this.fetchUsers();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    },
    resetForm() {
      this.userForm = {
        id: null,
        username: '',
        email: '',
        password: ''
      };
      this.editing = false;
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
h1 {
  font-weight: bold;
}
</style>
