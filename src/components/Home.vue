<template>

  <v-container fluid>

    <v-layout row>
      <v-flex xs12>
          <v-img
          src="https://wallbox.ru/wallpapers/main/201127/42fea575a3cfacde8a33d68798269c4a.jpg"
          aspect-ratio="4.25"
          >
            <v-container fill-height>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <h3 class="display-3">Welcome to Lingvomake</h3>
                  <v-chip label color="red"><h2 class="display-1">Powerful</h2></v-chip>
                  –
                  <v-chip label color="primary"><h2 class="display-1">Innovative</h2></v-chip>
                  –
                  <v-chip label color="green"><h2 class="display-1">Simple</h2></v-chip>
                  <h3 class="display-2">course management system</h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

      </v-flex>
    </v-layout>

    <br>

    <v-layout row>
        <v-flex xs12>
          <div class="likeCard">
            <h1 class="headline text-xs-center">Lingvomake gives you such opportunities as</h1>
          </div>
        </v-flex>
      </v-layout>

    <br>

    <v-layout row justify-center wrap>

      <v-flex xs12 sm3 md3 lg3>
        <v-card>
          <v-img
                aspect-ratio="2.75"
                src="https://mobileadvertisingwatch.com/wp-content/uploads/2014/04/Android-Finally-Conquers-Apples-iOS-Mobile-Ad-Traffic.jpg">
            </v-img>
          <v-card-text class="headline font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm3 offset-sm-1 md3 offset-md1 lg3 offset-lg1>
        <v-card>
          <v-img
              aspect-ratio="2.75"
              src="https://avatars.mds.yandex.net/get-pdb/1367830/f9dafdf7-e94d-4e78-bc68-df62113be3b3/s1200?webp=false">
          </v-img>
          <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm3 offset-sm-1 md3 offset-md1 lg3 offset-lg1>
        <v-card>
          <v-img
              aspect-ratio="2.75"
              src="https://ak2.picdn.net/shutterstock/videos/7869652/thumb/1.jpg">
          </v-img>
          <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
export default {
  data() {
    return {
	    gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
    };
  }
};
</script>

<style>
  .likeCard {
    /*border: solid;*/
  }
</style>
