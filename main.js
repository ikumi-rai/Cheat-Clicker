(() => {
	function popGoldenCookie() {
		const g = Game.shimmerTypes.golden
		g.time = g.maxTime
	}

	function popReindeer() {
		const r = Game.shimmerTypes.reindeer
		r.time = r.maxTime
	}

	function getAllShimmers() {
		Game.shimmers.forEach(s => s.pop())
	}

	function dropLump() {
		Game.lumpMatureAge = 1
		Game.lumpRipeAge = 1
		Game.lumpOverripeAge = 1
	}

	function popWrinklers() {
		Game.wrinklers.forEach(w => {
			w.phase = 1
			w.sucked = 1
			w.type = 1
		})
	}

	function beatWrinklers() {
		Game.wrinklers.forEach(w => w.hp = 0)
	}

	function reloadNews() {
		if (!Game.tickerL.innerText.match(/No.\d{3}/)) Game.getNewTicker()
	}

	function growCrops() {
		const g = Game.Objects['Farm'].minigame
		g.nextStep = Date.now()  // tick
		range(6).forEach(x => {
			range(6).forEach(y => {
				if (g.getTile(x, y)[1] > 95) g.harvest(x, y)
			})
		})
	}

	function plantCrop(x, y, id) {
		Game.Objects['Farm'].minigame.getTile(x, y)[0] = id
	}

	function fillField(id) {
		range(6).forEach(x => {
			range(6).forEach(y => {
				plantCrop(x, y, id)
			})
		})
	}

	function manipulateMarket(price) {
		Game.Objects["Bank"].minigame.goodsById.forEach(g => g.val = price)
	}

	function healMP() {
		const g = Game.Objects["Wizard tower"].minigame
		g.magic = g.magicM
	}

	function getCheatAchievement() {
		Game.resets = 999  // Endless cycle
		/*
		Game.cookiesPs = 0
		Game.cookies = 1_000_000_000_000
		Achievement "Cheated cookies taste awful".
		Maybe if you get this, your achievements won't be reflected in steam.
		*/
	}

	function apply(func, ...args) {
		return () => func(...args)
	}

	function range(n) {
		return Array.from(Array(n), (_, k) => k)
	}

	class CheatButtonsDiv {
		constructor(parent, name) {
			const div = document.createElement("div")
			div.id = name + "CheatButtons"
			l(parent).insertAdjacentElement("beforeend", div)
			this.elm = div
		}

		insertCheatButton(name, ...funcs) {
			const btn = document.createElement("a")
			btn.style = "font-size:12px; display:inline-block; margin:4px"
			btn.className = "smallFancyButton"
			btn.innerText = name
			const id = name + "Button"
			btn.id = id
			this.elm.insertAdjacentElement("beforeend", btn)
			funcs.forEach(f => AddEvent(btn, "click", f))
		}
	}

	class CheatClicker {
		init() {
			Game.Win("Third-party")
			const usual = new CheatButtonsDiv("storeTitle", "usual")
			usual.insertCheatButton("golden", popGoldenCookie, getAllShimmers)
			usual.insertCheatButton("lump", dropLump)
			usual.insertCheatButton("wrinklers", popWrinklers, beatWrinklers)
			usual.insertCheatButton("news", reloadNews)
			const miniGame = new CheatButtonsDiv("storeTitle", "miniGame")
			miniGame.insertCheatButton("grow", growCrops)
			// miniGame.insertCheatButton("fill", apply(fillField, 34))
			miniGame.insertCheatButton("crash", apply(manipulateMarket, 0))
			// miniGame.insertCheatButton("rise", apply(manipulateMarket, 65535))
			miniGame.insertCheatButton("mp", healMP)
			// const achieve = new CheatButtonsDiv("storeTitle", "achieve")
			// achieve.insertCheatButton("achievement", getCheatAchievement)
		}

		save() {
		}

		load() {
		}
	}

	Game.registerMod("cheat", new CheatClicker())
})()
