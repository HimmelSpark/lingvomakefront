<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-timeline align-top dark>
          <v-timeline-item
              v-for="item in items"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{item.header}}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{item.text}}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
      {
        icon: 'help',
        header: "Step#1: Add an educational course",
        text: 'Click COURSES then «+» button',
        imgSrc: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'
      },
      {
        icon: 'book',
		    header: "Step#2: Add a unit to the course",
		    text: 'Click on your COURSE on the left bar, then ADD UNIT button',
		    imgSrc: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'
      },
      {
        icon: 'add',
		    header: "Step#3: Add a task to the unit",
		    text: 'Click on your UNIT on the left bar, then ADD TASK button',
		    imgSrc: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'
      },
      {
        icon: 'fingerprint',
		    header: "Step#4: Save your work and generate application",
		    text: 'Click SETTINGS->Application and generate Application',
		    imgSrc: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'
      }
      ]
    })
  }
</script>