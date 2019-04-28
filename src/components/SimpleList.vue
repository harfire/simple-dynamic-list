<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title is-3">{{ msg }}</h1>
          <p class="space">Using Vuejs Framework</p>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <template v-if="errorNotification">
            <div class="notification is-danger">
              <button @click="errorNotification = false" class="delete"></button>
              <div>Failed to update data!</div>
              {{ errorMessage }}
            </div>
          </template>
          <div class="filter-cont">
            <a @click.prevent="showFilterProp()" class="button" :class="[ showFilter ? '' : 'is-primary' ]">
              <template v-if="showFilter">Hide</template>
              <template v-else>Filter</template>
            </a>
          </div>
          <table class="table is-striped is-bordered table-list">
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="23%">Title</th>
                <th width="12%">Views</th>
                <th width="22%">Genre</th>
                <th width="27%">Descriptions</th>
                <th width="11%">Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="showFilter">
                <tr>
                  <td></td>
                  <td><input class="input" type="text" v-model="searchTitle" placeholder="Keyword"></td>
                  <td></td>
                  <td><input class="input" type="text" v-model="searchGenre" placeholder="Keyword"></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
              <template v-if="showNoData">
                <tr>
                  <td class="centered" colspan="6">No Data!</td>
                </tr>
              </template>
              <template v-if="loading">
                <tr>
                  <td class="centered" colspan="6">Loading...</td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(item, index) in filtered" :key="`list-${index}`">
                  <th>
                    {{ index + 1 }}
                    <div v-if="item.update && loadingUpdate" class="overlay">
                      <div class="row">Loading...</div>
                    </div>
                  </th>
                  <td>
                    <template v-if="item.update">
                      <input class="input" type="text" v-model="item.title">
                    </template>
                    <template v-else>
                      {{ item.title }}
                    </template>
                  </td>
                  <td>
                    <template v-if="item.update">
                      <input class="input" type="number" v-model.number="item.views">
                    </template>
                    <template v-else>
                      {{ item.views }}
                    </template>
                  </td>
                  <td>
                    <template v-if="item.update">
                      <input class="input" type="text" v-model="item.genre">
                    </template>
                    <template v-else>
                      {{ item.genre }}
                    </template>
                  </td>
                  <td>
                    <template v-if="item.update">
                      <input class="input" type="text" v-model="item.descriptions">
                    </template>
                    <template v-else>
                      <span>{{ truncateText(item.descriptions, 25) }}</span>
                      <div v-show="item.tooltip === true" class="tooltip">
                        <div class="box">
                          <a @click.prevent="showTooltip(index, item.tooltip)" class="close-tooltip">&#10006;</a>
                          <div class="desc-tooltip">{{ item.descriptions }}</div>
                        </div>
                      </div>
                      <template v-if="showIcon(item.descriptions)">
                        <a @click.prevent="showTooltip(index, item.tooltip)" class="info-icon">&#8505;</a>
                      </template>
                    </template>
                  </td>
                  <td class="centered">
                    <template v-if="item.update">
                      <a @click.prevent="updateMovieList(index)" class="button is-primary is-small">Simpan</a>
                      <a @click.prevent="resetStatus()" class="cancel-update">Batal</a>
                    </template>
                    <template v-else>
                      <a @click="showSaveButton(index)" class="edit-icon">&#9998;</a>
                    </template>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="footer">
            <strong>Haris Rahman</strong>&nbsp;<small>|</small>&nbsp;<small>+628159156249</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SimpleList',
  props: {
    msg: String
  },
  data() {
    return {
      loading: true,
      movieList: [],
      tooltip: false,
      errorNotification: false,
      errorMessage: '',
      showFilter: false,
      searchTitle: '',
      searchGenre: '',
      showNoData: false,
      loadingUpdate: false,
    };
  },
  computed: {
    filtered() {
      let filtered = this.movieList;

      if (this.searchTitle) {
        filtered = this.movieList.filter(m => m.title.toLowerCase().indexOf(this.searchTitle) > -1);
      } else {
        filtered = this.movieList.filter(m => m.genre.toLowerCase().indexOf(this.searchGenre) > -1);
      }

      if (!filtered.length) {
        this.showNoData = true;
      } else {
        this.showNoData = false;
      }

      return filtered;
    },
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;

      const urlGetPath = 'https://andywiranata-42555.firebaseio.com/test-frontend/items.json';
      await axios
        .get(urlGetPath)
        .then(response => {
          if (response) {
            this.resetStatus(response.data);
            this.loading = false;
          }
        })
        .catch(error => {
          this.errorNotification = true;
          this.errorMessage = error;
          this.loading = false;
        });
    },
    truncateText(string, max) {
      if (string.length > max) {
        return string.substring(0, max) + '...';
      }
      return string;
    },
    showIcon(string) {
      if (string.length > 30) {
        return true;
      }
      return false;
    },
    resetStatus(data = this.movieList) {
      this.movieList = data.map(val => {
        val.tooltip = false;
        val.update = false;
        return val;
      });
    },
    async showTooltip(index, tooltip) {
      await this.resetStatus();

      // Show toltips
      this.movieList[index].tooltip = !tooltip;
    },
    showSaveButton(index) {
      this.resetStatus();

      this.movieList[index].update = !this.movieList[index].update;
    },
    showFilterProp(index) {
      this.resetStatus();

      // Reset filtered item
      this.searchTitle = '';
      this.searchGenre = '';

      this.showFilter = !this.showFilter;
    },
    updateMovieList(index) {
      this.loadingUpdate = true;

      const url = 'https://andywiranata-42555.firebaseio.com/test-frontend/items/0.json';
      const data = {
        title: this.movieList[index].title,
        views: this.movieList[index].views,
        genre: this.movieList[index].genre,
        descriptions: this.movieList[index].descriptions,
      };
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }

      axios
      .put(url, data, config)
      .then(response => {
        if (response) {
          this.loadingUpdate = false;
          this.getData();
          this.resetStatus();
        }
      })
      .catch(error => {
        this.errorNotification = true;
        this.errorMessage = error;
        this.loading = false;
        this.loadingUpdate = false;
        this.getData();
        this.resetStatus();
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-bottom: 100px;
}
.table-list {
  width: 100%;
}
.filter-cont {
  float: left;
  margin-bottom: 10px;
}
.space {
  margin-bottom: 30px;
}
.centered {
  text-align: center;
}
.footer {
  padding: 30px 0;
  background-color: #fff;
}
.info-icon {
  background: #000;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: inline-block;
  padding: 0;
  margin: 0;
  text-align: center;
  line-height: 14px;
  color: #fff;
  font-size: 14px;
}
.info-icon:hover, .edit-icon:hover {
  background: blue;
}
.edit-icon {
  background: #209cee;
  color: #fff;
  display: inline-block;
  border-radius: 25%;
  height: 20px;
  width: 20px;
  line-height: 22px;
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
}
.tooltip {
  position: relative;
  width: 1px;
  height: 1px;
  float: right;
  z-index: 2;
}
.tooltip > div {
  position: relative;
  top: 0px;
  left: -32px;
  background: rgb(255, 255, 255);
  padding: 10px 16px;
  font-size: 13px;
  border-radius: 5px;
  width: 230px;
}
.close-tooltip {
  display: inline-block;
  float: right;
}
.desc-tooltip {

}
.cancel-update {
  font-size: .7em;
  font-weight: 600;
}
.overlay {
  position: relative;
  width: 1px;
  height: 1px;
  left: 0;
  top: 0;
}
.overlay .row {
  background: #e0e3c3;
  position: relative;
  width: 914px;
  height: 67px;
  left: -12px;
  top: -32px;
  opacity: .5;
  z-index: 3;
  text-align: center;
  line-height: 70px;
  text-shadow: 1px 1px 0px #fff;
  font-weight: 800;
  color: #000;
}
</style>
