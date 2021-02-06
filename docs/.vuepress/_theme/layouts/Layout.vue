<template>
	<div class="container">
		<!-- Blueprint header -->
		<header class="bp-header cf">
			<div class="dummy-logo">
				<div class="dummy-icon foodicon foodicon--coconut"></div>
				<h2 class="dummy-heading">Fooganic</h2>
			</div>
		</header>
		<button class="action action--open" aria-label="Open Menu"><span class="icon icon--menu"></span></button>
		<nav id="ml-menu" class="menu">
			<button class="action action--close" aria-label="Close Menu"><span class="icon icon--cross"></span></button>
			<div class="menu__wrap">
				<ul data-menu="main" class="menu__level" tabindex="-1" role="menu" aria-label="All">
					<li v-for="(nav, index) in navList" :key="index" class="menu__item" role="menuitem"><a class="menu__link" data-submenu="submenu-1" aria-owns="submenu-1" href="#">{{ nav.text }}</a></li>
				</ul>
				<!-- Submenu 1 -->
				<ul data-menu="submenu-1" id="submenu-1" class="menu__level" tabindex="-1" role="menu" aria-label="Vegetables">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Stalk Vegetables</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Roots &amp; Seeds</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Cabbages</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Salad Greens</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Mushrooms</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" data-submenu="submenu-1-1" aria-owns="submenu-1-1" href="#">Sale %</a></li>
				</ul>
				<!-- Submenu 1-1 -->
				<ul data-menu="submenu-1-1" id="submenu-1-1" class="menu__level" tabindex="-1" role="menu" aria-label="Sale %">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Fair Trade Roots</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Dried Veggies</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Our Brand</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Homemade</a></li>
				</ul>
				<!-- Submenu 2 -->
				<ul data-menu="submenu-2" id="submenu-2" class="menu__level" tabindex="-1" role="menu" aria-label="Fruits">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Citrus Fruits</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Berries</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" data-submenu="submenu-2-1" aria-owns="submenu-2-1" href="#">Special Selection</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Tropical Fruits</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Melons</a></li>
				</ul>
				<!-- Submenu 2-1 -->
				<ul data-menu="submenu-2-1" id="submenu-2-1" class="menu__level" tabindex="-1" role="menu" aria-label="Special Selection">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Exotic Mixes</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Wild Pick</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Vitamin Boosters</a></li>
				</ul>
				<!-- Submenu 3 -->
				<ul data-menu="submenu-3" id="submenu-3" class="menu__level" tabindex="-1" role="menu" aria-label="Grains">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Buckwheat</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Millet</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Quinoa</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Wild Rice</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Durum Wheat</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" data-submenu="submenu-3-1" aria-owns="submenu-3-1" href="#">Promo Packs</a></li>
				</ul>
				<!-- Submenu 3-1 -->
				<ul data-menu="submenu-3-1" id="submenu-3-1" class="menu__level" tabindex="-1" role="menu" aria-label="Promo Packs">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Starter Kit</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">The Essential 8</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Bolivian Secrets</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Flour Packs</a></li>
				</ul>
				<!-- Submenu 4 -->
				<ul data-menu="submenu-4" id="submenu-4" class="menu__level" tabindex="-1" role="menu" aria-label="Mylk &amp; Drinks">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Grain Mylks</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Seed Mylks</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Nut Mylks</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Nutri Drinks</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" data-submenu="submenu-4-1" aria-owns="submenu-4-1" href="#">Selection</a></li>
				</ul>
				<!-- Submenu 4-1 -->
				<ul data-menu="submenu-4-1" id="submenu-4-1" class="menu__level" tabindex="-1" role="menu" aria-label="Selection">
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Nut Mylk Packs</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Amino Acid Heaven</a></li>
					<li class="menu__item" role="menuitem"><a class="menu__link" href="#">Allergy Free</a></li>
				</ul>
			</div>
		</nav>
		<div class="content">
			<p class="info">Please choose a category</p>
			<!-- Ajax loaded content here -->
		</div>
	</div>
</template>

<script>
import '../../utils/modernizr-custom'
import MLMenu from '../../utils/MLMenu'
export default {
  computed: {
    navList() {
      const list = this.$themeConfig.nav
      return list
    }
  },
  data() {
    return {
      onEndAnimation: null
    }
  },
  mounted () {
    this.initMenu()
  },
  methods: {
    initMenu() {
      // init MLMenu
      window.MLMenu = MLMenu;

			const menuEl = document.getElementById('ml-menu'),
				mlmenu = new MLMenu(menuEl, {
					// breadcrumbsCtrl : true, // show breadcrumbs
					// initialBreadcrumb : 'all', // initial breadcrumb text
					backCtrl: false, // show back button
					// itemsDelayInterval : 60, // delay between each menu item sliding animation
					onItemClick: () => console.log('test') // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
        });
    },
  },
}
</script>

<style lang="scss">
@-webkit-keyframes outToRight {
	to {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
}

@keyframes outToRight {
	to {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
}
@-webkit-keyframes outToLeft {
	to {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
}

@keyframes outToLeft {
	to {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
}
@-webkit-keyframes inFromLeft {
	from {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}

@keyframes inFromLeft {
	from {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}
@-webkit-keyframes inFromRight {
	from {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}

@keyframes inFromRight {
	from {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}
.container {
	font-family: 'Avenir Next', Avenir, 'Helvetica Neue', 'Lato', 'Segoe UI', Helvetica, Arial, sans-serif;
	overflow: hidden;
	margin: 0;
  height: 100vh;
	color: #cecece;
	background: #2a2b30;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow-y: auto;
  .action {
    position: absolute;
    display: block;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border: none;
    background: none;
    &:focus {
      outline: none;
    }
    .icon {
      font-family: 'feather';
      font-weight: normal;
      font-style: normal;
      font-variant: normal;
      line-height: 1;
      text-transform: none;
      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      speak: none;
    }
    .icon--arrow-left:before {
      content: '\e901';
    }

    .icon--menu:before {
      content: '\e903';
    }

    .icon--cross:before {
      content: '\e117';
    }
    &.action--open {
      font-size: 1.5em;
      top: 1em;
      left: 1em;
      display: none;
      color: #fff;
      position: fixed;
      z-index: 1000;
    }
    &.action--close {
      font-size: 1.1em;
      top: 1.25em;
      right: 1em;
      display: none;
      color: #45464e;
    }
  }
  .menu {
    position: fixed;
    top: 120px;
    left: 0;
    width: 300px;
    height: calc(100vh - 120px);
    background: #1c1d22;
    .menu__wrap {
      position: absolute;
      top: 3.5em;
      bottom: 0;
      overflow: hidden;
      width: 100%;
      .menu__level {
        position: absolute;
        top: 0;
        left: 0;
        visibility: hidden;
        overflow: hidden;
        overflow-y: scroll;
        width: calc(100% + 50px);
        height: 100%;
        margin: 0;
        padding: 0;
        list-style-type: none;
        &:focus {
          outline: none;
        }
        .menu__item {
          display: block;
          width: calc(100% - 50px);
          .menu__link {
            font-weight: 600;
            position: relative;
            display: block;
            padding: 1em 2.5em 1em 1.5em;
            color: #bdbdbd;
            -webkit-transition: color 0.1s;
            transition: color 0.1s;
          }
          .menu__link[data-submenu]::after {
            content: '\e904';
            font-family: 'feather';
            position: absolute;
            right: 0;
            padding: 0.25em 1.25em;
            color: #2a2b30;
          }

          .menu__link:hover,
          .menu__link:focus,
          .menu__link[data-submenu]:hover::after,
          .menu__link[data-submenu]:focus::after {
            color: #5c5edc;
          }

          .menu__link--current::before {
            content: '\00B7';
            font-size: 1.5em;
            line-height: 0;
            position: absolute;
            top: 50%;
            left: 0.5em;
            height: 4px;
            color: #5c5edc;
          }

          [class^='animate-'],
          [class*=' animate-'] {
            visibility: visible;
          }
        }
        .animate-outToRight .menu__item {
          -webkit-animation: outToRight 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
          animation: outToRight 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
        }
        .animate-outToLeft .menu__item {
          -webkit-animation: outToLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
          animation: outToLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
        }
        .animate-inFromLeft .menu__item {
          -webkit-animation: inFromLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
          animation: inFromLeft 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
        }
        .animate-inFromRight .menu__item {
          -webkit-animation: inFromRight 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
          animation: inFromRight 0.6s both cubic-bezier(0.7, 0, 0.3, 1);
        }
      }
      .menu__level--current {
        visibility: visible;
      }
    }
  }
}
</style>
