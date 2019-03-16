<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>

        <v-flex xs4>
          <v-treeview :items="items" hoverable></v-treeview>
        </v-flex>

        <v-divider
            class="mx-3"
            inset
            vertical
        ></v-divider>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
	data() {
	  return {
	  items: [
      {
        id: 2,
        name: 'Courses :',
        children: [
          {
            id: 1,
            name: 'TOEFL iBT',
            children: [
              {
                id: 5,
                name: 'Unit 1'
              }
            ]
          },
          {
            id: 3,
            name: 'CAE',
            children: [
              {
                id: 6,
                name: 'Unit 1',
                children: [
                  {
                    id: 8,
                    name: 'Psychology'
                  },
                  {
                    id: 9,
                    name: 'Theology'
                  }
                ]
              }
            ]
          },
          {
            id: 4,
            name: 'GMATH',
            children: [
              {
                id: 7,
                name: 'Unit 1',

              }
            ]
          },
        ]
      },
	  ]
	  }
	}
  }
</script>