// Shared content store for the Cyberfarms site.
// index.html reads from this to render; admin.html writes to it.
// No backend exists yet, so edits persist in the browser's localStorage —
// changes made in admin.html only show up on index.html when opened
// in the same browser (or after using Export/Import to move the JSON around).

(function () {
  const STORAGE_KEY = "cyberfarms_site_data";

  const defaultData = {
    home: {
      heading: "Welcome to Cyberfarms",
      body: "We build technology for businesses that technology usually ignores.\n\n" +
        "Cyberfarms Private Limited is a consumer AI and platform development company. " +
        "We build platforms, applications and aggregation services for small and growing " +
        "businesses, using the same quality of technology that large enterprises take for granted.\n\n" +
        "Our aim is simple: to change how everyday businesses operate, compete and grow.",
    },
    about: {
      heading: "About Us",
      body: "Founded in 2025, Cyberfarms bridges the gap between technology, infrastructure " +
        "and the businesses that need them most. Most software is built for large companies. " +
        "Everyone else is left to work around it, or to depend on platforms whose rules they " +
        "had no part in writing. Over time, the businesses on these platforms stop being " +
        "customers and start serving them, tied to terms set elsewhere.\n\n" +
        "We believe every business deserves a fair chance to compete, at home and globally. " +
        "So we build those tools and put them directly in the hands of the businesses that need them.\n\n" +
        "What we build\n\n" +
        "Platforms and applications designed to serve the businesses using them, not to extract from them.\n\n" +
        "Aggregation services that help smaller businesses reach more customers while keeping their independence and their pricing.\n\n" +
        "Enterprise search, so organisations can find and use what they already know.\n\n" +
        "Supply chain systems, because better-connected supply chains mean steadier income, less money tied up in stock, and the visibility to plan ahead rather than react.\n\n" +
        "Promoters\n\n" +
        "Kishore.C\n\n" +
        "Sai Prasanth Rega\n\n" +
        "Guna Sekher Reddy Pannuganti\n\n" +
        "Yashwanth Rathlawath",
      promoters: [
        {
          name: "Kishore.C",
          detail: "Director",
        },
        {
          name: "Sai Prasanth Rega",
          detail: "Director",
        },
        {
          name: "Guna Sekher Reddy Pannuganti",
          detail: "Director",
        },
        {
          name: "Yashwanth Rathlawath",
          detail: "Director",
        },
      ],
    },
    categories: [
      {
        id: "aggregators",
        name: "Aggregators",
        description: "Help smaller businesses reach more customers while keeping their independence and pricing.",
        products: [
          {
            name: "Aggregator One",
            initials: "A1",
            description: "Aggregation tools that help independent businesses reach more customers.",
            docHref: "#aggregators",
            downloadHref: "#",
          },
          {
            name: "Aggregator Two",
            initials: "A2",
            description: "Customer access without giving up independence or control over pricing.",
            docHref: "#aggregators",
            downloadHref: "#",
          },
        ],
      },
      {
        id: "platforms",
        name: "Platforms",
        description: "Platforms and applications designed to serve the businesses using them.",
        products: [
          {
            name: "Platform One",
            initials: "P1",
            description: "Practical platforms and applications for small and growing businesses.",
            docHref: "#platforms",
            downloadHref: "#",
          },
        ],
      },
      {
        id: "supply-chain",
        name: "Supply Chain & Logistics",
        description: "Better-connected supply chains for steadier income and clearer planning.",
        products: [
          {
            name: "Supply App",
            initials: "SC",
            description: "Connected supply chain systems for steadier income and less stock tied up.",
            docHref: "#supply-chain",
            downloadHref: "#",
          },
        ],
      },
      {
        id: "workflow-engines",
        name: "Workflow Engines",
        description: "Workflow systems that make everyday operations easier to run and improve.",
        products: [
          {
            name: "Gauriflows",
            initials: "GF",
            description: "Workflow engine for modern operations teams.",
            docHref: "#workflow-engines",
            downloadHref: "https://www.gauriflows.com",
          },
        ],
      },
      {
        id: "mental-health",
        name: "Mental Health Training",
        description: "Training tools that support healthier, more capable organisations.",
        products: [
          {
            name: "MH Training",
            initials: "MH",
            description: "Accessible mental health training for modern teams and workplaces.",
            docHref: "#mental-health",
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
