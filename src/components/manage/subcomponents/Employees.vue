<template>
  <v-container>
    <v-layout row>

      <v-flex xs12>

        <v-layout row>
          <v-flex xs12>
            <v-chip label dark color="primary">
              <v-icon left>group</v-icon>
              <div><h1 class="headline mb-0">Employees</h1></div>
            </v-chip>
          </v-flex>
        </v-layout>

        <br>

        <v-layout row>

          <v-flex xs11>
            <v-text-field
                class="mx-3"
                flat
                label="Search"
                prepend-inner-icon="search"
                solo-inverted>
            </v-text-field>
          </v-flex>

          <v-flex xs1>
            <v-btn
                icon
                dark
                bottom
                color="primary"
                @click="openAddEmployeeDialog">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>

        </v-layout>

        <v-data-table
              :headers="headers"
              :items="employees"
              class="elevation-1">
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="center">{{ props.item.email }}</td>
              <td class="text-xs-center password">{{ props.item.password }}</td>
              <td class="text-xs-center">
                <v-btn icon @click="openEditEmployeeDialog(props.item.id)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">
                <v-btn icon>
                  <v-icon color="red" @click="openDeleteEmployeeDialog">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>

        <v-dialog v-model="addEmployeeDialog" persistent max-width="490">
          <v-card>
            <v-card-title class="headline">
              Adding new Employee
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
                <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    :rules="emailRules"
                    v-model="email"
                ></v-text-field>
                <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    :counter="8"
                    :rules="passwordRules"
                    v-model="password"
                ></v-text-field>
                <v-text-field
                    prepend-icon="lock"
                    name="passwordConfirm"
                    label="Confirm password"
                    id="passwordConfirm"
                    type="password"
                    :counter="8"
                    :rules="passwordConfirmRules"
                    v-model="passwordConfirm"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="addEmployeeDialog = false"
              >Cancel</v-btn>
              <v-btn color="green" flat @click="addEmployeeDialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteEmployeeDialog" persistent max-width="320">
          <v-card>
            <v-card-title class="headline">Do you want to delete this employee?</v-card-title>
            <v-card-text>This process is irreversible, you can't restore this employee later!</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="deleteEmployeeDialog = false">Cancel</v-btn>
              <v-btn color="red" flat @click="deleteEmployeeDialog = false">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editEmployeeDialog" persistent max-width="320">
          <v-card>
            <v-card-title class="headline">You are editing employee</v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
                <v-text-field
                    prepend-icon="lock"
                    label="change password"
                    id="password"
                    type="password"
                    :counter="8"
                    :rules="passwordRules"
                    v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="editEmployeeDialog = false">Cancel</v-btn>
              <v-btn color="green" flat @click="editEmployeeDialog = false">Change</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
		    addEmployeeDialog: false,
		    email: "",
        password: "",
		    passwordConfirm: "",
        headers: [
            { text: 'Id', align: 'left', sortable: false, value: 'id'},
            { text: 'Email', value: 'name' },
        ],
        valid: false,
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [
          v => !!v || "Password is required",
          v => (v && v.length >= 8) || "Too short password"
        ],
        passwordConfirmRules: [
          v => !!v || "Password confirmation is required",
          v => v === this.password || "Passwords didn't match"
        ],

        deleteEmployeeDialog: false,

        editEmployeeDialog: false,

        employees: [
          {
            id: 1,
            email: 'somemail@mail.ru',
          },
          {
            id: 2,
			      email: 'othermail@bk.ru',
          },
          {
            id: 3,
			      email: 'outlook@outlook.com',
          },
          {
            id: 4,
            email: 'yahooyeah@yahoo.com',
          },
          {
            id: 5,
            email: 'google@corp.evil',
          },
          {
            id: 6,
            email: 'adroid@gov.no',
          },
          {
            id: 7,
            email: 'Lollipop',
          },
          {
            id: 8,
            email: 'Honeycomb',
          },
          {
            id: 9,
            email: 'Donut',
          },
          {
            id: 10,
            email: 'KitKat',
          }
        ]
      };
    },
    methods: {
      openAddEmployeeDialog() {
        this.addEmployeeDialog = true;
      },
      openDeleteEmployeeDialog() {
        this.deleteEmployeeDialog = true;
      },
      openEditEmployeeDialog(id) {
        this.password = '';
        this.editEmployeeDialog = true;
      }
    }
  };
</script>
