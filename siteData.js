// Shared content store for the Cyberfarms site.
// appCyberfarms.html reads from this to render; admin.html writes to it.
// No backend exists yet, so edits persist in the browser's localStorage —
// changes made in admin.html only show up on appCyberfarms.html when opened
// in the same browser (or after using Export/Import to move the JSON around).

(function () {
  const STORAGE_KEY = "cyberfarms_site_data";

  const defaultData = {
    home: {
      heading: "Welcome to Cyberfarms",
      body:
        "Aut quia laborum consequat et qui quasi dicta aut consequat veniam id id " +
        "tempor ad occaecati eu vel occaecati magna molestias ad et ipsa et cupidatat cum nam " +
        "de enim reprehenderit distinctio pariatur odio inventore et in quaerat vel aut " +
        "exercitationem at laborum soluta quis sed ad quo exercitation in modi labore mollit " +
        "veniam accusantium ad cum sit irure dolor natus velit de sit neque praesentium " +
        "quod iusto vel incididunt in cillum magnam voluptatum in enim in consequat ad " +
        "et minus voluptas ut atque magni quod nam eligendi ad expedita incididunt neque in et vero atque aliqua ad suscipit expedita.",
    },
    about: {
      heading: "About Us",
      body:
        "Culpa ad enim accusantium quia de nec voluptas vel cum aliqua nec enim ad de illo " +
        "architecto ipsum in vel quaerat facere provident id in dicta laborum nam quia vel " +
        "molestias at vel eius architecto deserunt ex irure iusto de suscipit quo aliquam " +
        "at neque dolor laborum soluta illo iusto optio enim fugit eu qui ducimus aut quia.",
    },
    categories: [
      {
        id: "aggregators",
        name: "Aggregators",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        products: [
          {
            name: "Aggregator One",
            initials: "A1",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
            docHref: "#blogs",
            downloadHref: "#",
          },
          {
            name: "Aggregator Two",
            initials: "A2",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
            docHref: "#blogs",
            downloadHref: "#",
          },
        ],
      },
      {
        id: "platforms",
        name: "Platforms",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        products: [
          {
            name: "Platform One",
            initials: "P1",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
            docHref: "#blogs",
            downloadHref: "#",
          },
        ],
      },
      {
        id: "supply-chain",
        name: "Supply Chain & Logistics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        products: [
          {
            name: "Supply App",
            initials: "SC",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
            docHref: "#blogs",
            downloadHref: "#",
          },
        ],
      },
      {
        id: "workflow-engines",
        name: "Workflow Engines",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        products: [
          {
            name: "Gauriflows",
            initials: "GF",
            description: "Workflow engine for modern operations teams.",
            docHref: "#blogs",
            downloadHref: "https://www.gauriflows.com",
          },
        ],
      },
      {
        id: "mental-health",
        name: "Mental Health Training",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        products: [
          {
            name: "MH Training",
            initials: "MH",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
            docHref: "#blogs",
            downloadHref: "#",
          },
        ],
      },
    ],
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function load() {
    let raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return clone(defaultData);
    }
    if (!raw) return clone(defaultData);
    try {
      const saved = JSON.parse(raw);
      return {
        home: Object.assign({}, defaultData.home, saved.home),
        about: Object.assign({}, defaultData.about, saved.about),
        categories: Array.isArray(saved.categories) ? saved.categories : clone(defaultData.categories),
      };
    } catch (e) {
      console.error("Cyberfarms: failed to parse saved site data, falling back to defaults.", e);
      return clone(defaultData);
    }
  }

  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
  }

  window.CyberfarmsData = {
    STORAGE_KEY: STORAGE_KEY,
    defaults: defaultData,
    load: load,
    save: save,
    reset: reset,
  };
})();
