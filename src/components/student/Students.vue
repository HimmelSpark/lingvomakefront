<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fill-height fluid justify-center>
        <v-layout row>
            <v-flex xs5 md4 lg3>
                <v-chip label dark color="primary">
                    <v-icon left>group</v-icon>
                    <div><h1 class="headline mb-0">Groups</h1></div>
                </v-chip>
                <v-treeview
                        :active.sync="active"
                        :open.sync="open"
                        :items="groups"
                        return-object
                        activatable
                        transition
                        hoverable
                >
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
                        <v-btn fab dark small color="indigo">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </v-layout>
                </div>

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
                            <!--<v-combobox-->
                                    <!--v-model="props.item.groupName"-->
                                    <!--:items="groupNames"-->
                                    <!--label="Select a favorite activity or create a new one"-->
                                    <!--multiple-->
                                    <!--readonly-->
                            <!--&gt;</v-combobox>-->
                        </td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.phone }}</td>
                        <td>
                            <v-btn small fab>
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </td>
                        <td>
                            <v-btn small fab color="red">
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
                active: [],
                search: null
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
            }
        },
        computed: {
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
