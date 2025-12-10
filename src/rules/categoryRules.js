const rules = [
  {
    category: "eCommerce",
    matchers: [/AMZN/i, /EBAY/i]
  },
  {
    category: "Transport & Food",
    matchers: [/Starbucks/i, /Uber/i]
  }
];

export function categorize(description) {
  for (const rule of rules) {
    if (rule.matchers.some((re) => re.test(description))) {
      return rule.category;
    }
  }
  return "Uncategorized";
}

export function getKnownCategories() {
  const set = new Set(rules.map((r) => r.category));
  set.add("Uncategorized");
  return Array.from(set);
}

export function addRule(category, matcher) {
  rules.push({ category, matchers: Array.isArray(matcher) ? matcher : [matcher] });
}

