<!--suppress ALL -->
<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                :rules="emailRules"
                v-model="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="school"
                name="school"
                label="School name"
                type="text"
                required
                v-model="school"
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
              <v-dialog v-model="loading" hide-overlay persistent width="300">
                <v-card color="dark" dark>
                  <v-card-text>
                    Please stand by
                    <v-progress-linear indeterminate color="white" class="mb-0">
                    </v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="orange"  @click="onSubmit">
              Create account
            </v-btn>
          </v-card-actions>

          <v-layout row>
            <v-card-text class="text-xs-center">Already have an account?</v-card-text>
          </v-layout>
          <v-layout row align-center justify-center>
            <v-btn block absolute to="/login">Log In</v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      school: "",
      password: "",
      passwordConfirm: "",
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
      ]
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };

        this.$store
          .dispatch("registerUser", { user: user, school: this.school })
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => console.log(err));
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
