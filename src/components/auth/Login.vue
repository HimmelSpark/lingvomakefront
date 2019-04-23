<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" @keyup.enter="onSubmit">
          <v-toolbar dark>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="valid"
              ref="form"
              validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="email"
                type="text"
                :rules="emailRules"
                v-model="email">
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                :counter="8"
                :rules="passwordRules"
                v-model="password">
              </v-text-field>
              <v-dialog v-model="loading" hide-overlay persistent width="300">
                <v-card color="dark" dark>
                  <v-card-text>
                    Please stand by
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0">
                    </v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="orange" @click="onSubmit">Login</v-btn>
          </v-card-actions>
          <v-layout row>
            <v-card-text class="text-xs-center">Haven't an account yet?</v-card-text>
          </v-layout>
          <v-layout row align-center justify-center>
            <v-btn block absolute to="/registration">Sign Up</v-btn>
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
      password: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Too short password"
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

        console.log(user);

        this.$store
          .dispatch("authUser", user)
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
