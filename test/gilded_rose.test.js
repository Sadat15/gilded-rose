const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("sellIn should decrease by 1", () => {
    const gildedRose = new Shop([new Item("foo", 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
  });

  it("quality should decrease by 1", () => {
    const gildedRose = new Shop([new Item("foo", 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });

  it("quality should decrease twice as fast after sellIn hits 0", () => {
    const gildedRose = new Shop([new Item("foo", 2, 10)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(6);
  });

  it("makes sure quality of an item can't drop below 0", () => {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("aged brie decreases in quality the older it gets", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 3, 1)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("an item cannot increase above 50 in quality", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("tests to make sure it doesn't decrease in quality", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  it("tests backstage passes so that it increases in quality when there are more than 10 days until concert", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });

  it("tests backstage passes so that it increases in quality when there are 10 days until concert", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("tests backstage passes so that it increases in quality when there are more than 5 days until concert", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });
  it("tests backstage passes so that the quality drops to 0 after the concert", () => {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
    ]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});
