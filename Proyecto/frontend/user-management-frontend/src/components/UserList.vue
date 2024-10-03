<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - {{ user.email }}
        <button @click="editUser(user)">Edit</button>
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>

    <div>
      <h2>{{ editing ? 'Edit User' : 'Add User' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="userForm.username" placeholder="Username" required />
        <input type="email" v-model="userForm.email" placeholder="Email" required />
        <input type="password" v-model="userForm.password" placeholder="Password" required />
        <button type="submit">{{ editing ? 'Update' : 'Create' }}</button>
      </form>
    </div>
  </div>
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
      editing: false
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
button {
  margin-left: 5px;
}

form {
  margin-top: 20px;
}
</style>
