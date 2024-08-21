#!/bin/bash

mkdir -p src/{api,assets,components,views,router,store,styles,types}

touch src/api/dogApi.ts \
      src/assets/logo.png \
      src/components/{BreedCard.vue,BreedGallery.vue,Pagination.vue} \
      src/views/{BreedListView.vue,BreedDetailView.vue} \
      src/router/index.ts \
      src/store/{index.ts,breeds.ts} \
      src/styles/{_variables.scss,_mixins.scss,main.scss} \
      src/types/index.ts \
      src/App.vue \
      src/main.ts \
      src/shims-vue.d.ts