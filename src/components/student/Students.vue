<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fill-height fluid justify-center>
        <v-layout row>
            <v-flex xs5 md4 lg3>
                <v-layout row wrap>
                <v-chip label dark color="primary">
                    <v-icon left>group</v-icon>
                    <div><h1 class="headline mb-0">Groups</h1></div>
                </v-chip
                ><v-btn fab dark small color="indigo"  @click="openAddGroupDialog">
                    <v-icon dark>add</v-icon>
                </v-btn>
                </v-layout>
                <v-treeview
                        :active.sync="active"
                        :open.sync="open"
                        :items="groups"
                        return-object
                        activatable
                        transition
                        hoverable>
                </v-treeview>
            </v-flex>

            <v-divider vertical></v-divider>

            <v-flex xs8 md9 lg10>
                <v-content>
                    <v-scroll-y-transition mode="out-in">
                        <router-view> </router-view>
                    </v-scroll-y-transition>
                </v-content>
                <div style="padding-left: 10px">
                    <v-layout row wrap>
                        <v-flex xs12 sm11>
                            <v-text-field
                                    flat
                                    v-model = "search"
                                    label="Search student"
                                    prepend-inner-icon="search"
                                    solo-inverted
                                    hide-details
                                    clearable
                                    :open.sync="open"
                            ></v-text-field>
                        </v-flex>
                        <v-btn fab dark small color="indigo"  @click="openAddStudentDialog">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </v-layout>
                </div>


                <v-dialog v-model="addStudentDialog" persistent max-width="490">
                    <v-card>
                        <v-card-title class="headline">
                            Adding new student
                        </v-card-title>
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
                                        prepend-icon="person"
                                        name="surname"
                                        label="Surname"
                                        type="text"
                                        v-model="surname"
                                ></v-text-field>

                                <v-text-field
                                        prepend-icon="person"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        v-model="name"
                                ></v-text-field>

                                <!--v-model="props.item.groupName"-->
                                <v-combobox
                                    :items="groupNames"
                                    label="Select a favorite activity or create a new one"
                                    multiple
                                    v-model="sgroups"
                                ></v-combobox>

                                <v-text-field
                                        prepend-icon="phone"
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        v-model="phone"
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
                            <v-btn color="primary" flat @click="addStudentDialog = false"
                            >Cancel</v-btn>
                            <v-btn color="green" flat @click="addStudentDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>










                <v-dialog v-model="addGroupDialog" persistent max-width="490">
                    <v-card>
                        <v-card-title class="headline">
                            Adding new group
                        </v-card-title>
                        <v-card-text>
                            <v-form v-model="valid" ref="form" validation>
                                <v-text-field
                                        name="name"
                                        label="Name"
                                        type="text"
                                        v-model="Gname"
                                ></v-text-field>
                                <v-text-field
                                        name="startDate"
                                        label="StartDate"
                                        type="text"
                                        v-model="GstartDate"
                                ></v-text-field>
                                <v-text-field
                                        name="description"
                                        label="Description"
                                        type="text"
                                        v-model="Gdescription"
                                ></v-text-field>

                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click="addGroupDialog = false"
                            >Cancel</v-btn>
                            <v-btn color="green" flat @click="addGroupDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>








                <v-dialog v-model="editStudentDialog" persistent max-width="490">
                    <v-card>
                        <v-card-title class="headline">
                            Editing student
                        </v-card-title>
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
                                        prepend-icon="person"
                                        name="surname"
                                        label="Surname"
                                        type="text"
                                        v-model="surname"
                                ></v-text-field>
                                <v-text-field
                                        prepend-icon="person"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        v-model="name"
                                ></v-text-field>

                                <!--v-model="props.item.groupName"-->
                                <v-combobox
                                        :items="groupNames"
                                        label="Select a favorite activity or create a new one"
                                        multiple
                                        v-model="sgroups"
                                ></v-combobox>
                                <v-text-field
                                        prepend-icon="phone"
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        v-model="phone"
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
                            <v-btn color="primary" flat @click="editStudentDialog = false"
                            >Cancel</v-btn>
                            <v-btn color="green" flat @click="editStudent(id)">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>



                <v-dialog v-model="deleteStudentDialog" persistent max-width="490">
                    <v-card>
                        <v-card-title class="headline">
                            Are you sure, you want to delete student?
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click="deleteStudentDialog = false"
                            >Cancel</v-btn>
                            <v-btn color="green" flat @click="deleteStudent()">Yes</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>











                <v-data-table
                        :headers="headers"
                        :items="students"
                        :custom-filter="custFilter"
                        :search="search"
                        :open.sync="open"
                        class="elevation-1"
                        style="padding-left: 10px"
                >
                    <template v-slot:items="props">
                        <!--<td class="text-xs-right">{{ props.item.id }}</td>-->

                        <td>{{ props.item.surname }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>
                            {{ props.item.groupName.join() }}

                        </td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.phone }}</td>
                        <td>
                            <v-btn small fab @click="openEditStudentDialog(props.item)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </td>
                        <td>
                            <v-btn small fab color="red" @click="openDeleteStudentDialog(props.item.id)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </td>

                        <!--<td class="text-xs-right">{{ props.item.carbs }}</td>-->
                        <!--<td class="text-xs-right">{{ props.item.protein }}</td>-->
                        <!--<td class="text-xs-right">{{ props.item.iron }}</td>-->
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                open: [],
                name: null,
                surname: null,
                id:null,
                password: null,
                email: null,
                passwordConfirm: null,
                sgroups: [],
                phone: null,
                active: [],
                search: null,
                addStudentDialog: false,
                editStudentDialog: false,
                deleteStudentDialog: false,
                addGroupDialog: false,
                Gname: false,
                Gdescription: false,
                Gstartdate: false,
            };
        },
        watch: {
            active: "clickTree"
        },
        methods: {
            clickTree() {
                if (this.active[0] !== undefined) {
                    this.$store.dispatch("setSelectedSTUD", this.active[0]);
                    switch (this.active[0].type) {
                        case "group":
                            this.$router.push("/students/group/" + this.active[0].id);
                            break;
                        case "all":
                            this.$router.push("/students/");
                            break;
                    }
                }
            },
            custFilter (items, search, filter) {
                search = search.toString().toLowerCase();
                return items.filter(row => (filter(row["surname"],search) ||
                    filter(row["name"],search) || filter(row["email"],search)));
            },
            openAddStudentDialog() {
                this.addStudentDialog = true;
            },
            openAddGroupDialog() {
                this.addGroupDialog = true;
            },
            openDeleteStudentDialog(id) {
                this.id = id;
                this.deleteStudentDialog = true;
            },
            openEditStudentDialog(student) {
                this.id = student.id;
                this.email = student.email;
                this.name = student.name;
                this.surname = student.surname;
                this.password = student.password;
                // this.sgroups = student.group;
                this.sgroups = student.groupName;
                this.passwordConfirm = student.passwordConfirm;
                this.phone = student.phone;

                this.editStudentDialog = true;
            },
            editStudent(id){
                var i = null;
                for (i in this.$store.getters.getStudents){
                    if(this.$store.getters.getStudents[i].id === id){
                        this.$store.getters.getStudents[i].email = this.email;

                        this.$store.getters.getStudents[i].password = this.password;
                        this.$store.getters.getStudents[i].name = this.name;
                        this.$store.getters.getStudents[i].surname = this.surname;

                        this.$store.getters.getStudents[i].phone = this.phone;

                        this.$store.getters.getStudents[i].groupName = this.sgroups;
                        break;
                    }
                }
                this.editStudentDialog = false;
            },
            deleteStudent(){
                var i = null;
                for (i in this.$store.getters.getStudents){
                    if(this.$store.getters.getStudents[i].id === this.id) {
                        this.$store.getters.getStudents.pop(i);
                        break;
                    }
                    }
                this.deleteStudentDialog = false;
                }
        },
        computed: {
            groupNames() {
                return this.$store.getters.getGroupNames;
            },
            groups() {
                return this.$store.getters.getGroups;
            },

            selected() {
                return this.$store.getters.getSelectedSTUD;
            },
            headers() {
                return this.$store.getters.getHead;
            },
            students() {
                return this.$store.getters.getStudents;

            },
        }
    };
</script>
