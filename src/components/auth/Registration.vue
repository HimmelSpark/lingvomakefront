<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="green">
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
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
                        <v-btn
                                dark
                                color="green"
                                @click="onSubmit"
                        >Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				passwordConfirm: '',
				valid: false,
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid'
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >=8) || 'Too short password'
				],
				passwordConfirmRules: [
					v => !!v || 'Password confirmation is required',
                    v => v === this.password || 'Passwords didn\'t match'
                ]
			}
		},
		methods: {
			onSubmit () {
				if (this.$refs.form.validate()) {
					const user = {
						email: this.email,
						password: this.password
					};

					console.log(user)
				}
			}
		}
	}
</script>