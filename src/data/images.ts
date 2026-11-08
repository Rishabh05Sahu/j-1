import type { ProductImage } from "@/types";

/**
 * Curated photography library. Every image is referenced by intent rather
 * than by URL so components never hardcode imagery.
 * Source: Unsplash (https://unsplash.com/license).
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

const img = (id: string, alt: string): ProductImage => ({ src: unsplash(id), alt });

export const images = {
  /* Rings */
  ringYellowSolitaire: img("1598560917807-1bae44bd2be8", "Emerald-cut diamond solitaire set in polished yellow gold"),
  ringHaloWhite: img("1591209627710-d2427565a41f", "Round brilliant diamond ring with a radiant halo, on white"),
  ringPinkSapphire: img("1603561591411-07134e71a2a9", "Cushion-cut pink sapphire ring framed by diamonds in rose gold"),
  ringPearBlack: img("1605100804567-1ffe942b5cd6", "Pear-shaped diamond halo ring resting on black"),
  ringHaloBlack: img("1605100804763-247f67b3557e", "Vintage-inspired diamond halo ring on a dark plinth"),
  ringPearCluster: img("1607703829739-c05b7beddf60", "Close-up of a pear-shaped diamond cluster ring"),
  ringGemstones: img("1608042314453-ae338d80c427", "Gold rings set with coloured gemstones arranged on a sculpted stone"),
  ringGoldCluster: img("1611955167811-4711904bb9f8", "Yellow gold cluster ring with champagne diamonds"),
  ringGoldBands: img("1622398925373-3f91b1e275f5", "Pair of polished yellow gold wedding bands"),
  ringWeddingBands: img("1627293509201-cd0c780043e6", "Two wedding bands resting on soft ivory silk"),
  ringTray: img("1631982690223-8aa4be0a2497", "Delicate gold rings presented in a linen jewelry tray"),
  ringStackGold: img("1543294001-f7cd5d7fb516", "Stack of gold rings with pavé diamonds"),
  ringRoseBands: img("1588909006332-2e30f95291bc", "Stacked rose gold bands with diamond detailing"),
  ringFlowerDiamond: img("1583937443566-6fe1a1c6e400", "Floral diamond cocktail ring on dark velvet"),
  ringPaveBand: img("1589674781759-c21c37956a44", "Crossover pavé diamond band in white gold"),
  ringEmerald: img("1602752250015-52934bc45613", "Emerald signet ring in yellow gold on white"),
  ringSapphireBlack: img("1606623546924-a4f3ae5ea3e8", "Sapphire and diamond ring catching the light in darkness"),

  /* Necklaces */
  necklacePearlBox: img("1515562141207-7a88fb7ce338", "Strand of pearls with a diamond clasp in an open jewelry case"),
  necklaceHeart: img("1588444837495-c6cfeb53f32d", "Diamond heart pendant on a fine white gold chain"),
  necklaceCushion: img("1589128777073-263566ae5e4d", "Cushion-cut diamond pendant on a box chain"),
  necklaceLayeredModel: img("1590548784585-643d2b9f2925", "Model wearing layered gold necklaces"),
  necklaceHalo: img("1598560917505-59a3ad559071", "Round diamond halo pendant in white gold"),
  necklaceGoldDress: img("1599459183200-59c7687a0275", "Woman in a gold silk dress wearing layered fine gold necklaces"),
  necklaceCrescent: img("1599643478518-a784e5dc4c8f", "Gold necklaces with a green gemstone pendant and crescent charm"),
  necklaceLayerWhite: img("1601821765780-754fa98637c1", "Layered gold pendants worn with a white linen shirt"),
  necklaceModelPendant: img("1610694955371-d4a3e0ce4b52", "Model wearing a delicate rose gold pendant necklace"),
  necklacePearlModel: img("1611085583191-a3b181a88401", "Model wearing a single pearl pendant on a fine gold chain"),
  necklaceModelDelicate: img("1611652022419-a9419f74343d", "Model wearing a fine diamond necklace with an open white shirt"),
  necklaceCoinLayered: img("1635767798638-3e25273a8236", "Layered gold chains with a sculpted coin pendant"),
  necklaceBridalSet: img("1601121141461-9d6647bca1ed", "Ornate gold bridal necklace and earrings set with rubies"),
  necklaceHanging: img("1506630448388-4e683c67ddb0", "Fine gold and silver pendants suspended in soft light"),
  necklaceGinkgoModel: img("1620656798579-1984d9e87df7", "Model wearing a sculpted gold leaf pendant and ring"),
  necklaceCloseModel: img("1531995811006-35cb42e1a022", "Close portrait of layered gold necklaces in sunlight"),
  necklaceRosePendants: img("1631965004544-1762fc696476", "Rose gold pendants held in an open palm"),

  /* Earrings */
  earringsSapphireDrop: img("1535632066927-ab7c9ab60908", "Sapphire and diamond drop earrings on a monstera leaf"),
  earringsHoopModel: img("1600721391776-b5cd0e0048f9", "Model wearing a small gold hoop earring"),
  earringsKnot: img("1603974372039-adc49044b6bd", "Gold knot earrings beside an antique mirror"),
  earringsHoopsPink: img("1608508644127-ba99d7732fee", "Petite rose gold hoops on a pink ceramic dish"),
  earringsTwistOne: img("1617038220319-276d3cfab638", "Twisted gold hoop earrings on sculpted stone"),
  earringsTwistTwo: img("1617038260897-41a1f14a8ca0", "Sculptural gold hoops styled with dried grasses"),
  earringsStudsBlack: img("1626784215021-2e39ccf971cd", "Diamond studs in yellow gold floral settings on black"),
  earringsRoseDrop: img("1629224316810-9d8805b95e76", "Rose gold teardrop diamond earrings on white"),
  earringsFlatlay: img("1549439602-43ebca2327af", "Gold statement earrings styled on black silk"),

  /* Bracelets */
  braceletDiamondBlack: img("1573408301185-9146fe634ad0", "Diamond line bracelet sparkling against black"),
  braceletChainMagazine: img("1602173574767-37ac01994b2a", "Gold chain bracelet resting on an open magazine"),
  braceletBangles: img("1611107683227-e9060eccd846", "Fine gold bangles stacked together"),
  braceletRoseBangle: img("1611591437281-460bfbe1220a", "Rose gold diamond bangle on blush"),
  braceletSilverChain: img("1625908733875-efa9c75c084d", "Sterling silver link bracelet on black silk"),
  braceletHandsModel: img("1596944924616-7b38e7cfac36", "Graceful hands wearing a fine gold bracelet and rings"),
  braceletStackModel: img("1583292650898-7d22cd27ca6f", "Stacked gold cuffs and bangles worn together"),
  modelHandsWhite: img("1633934542430-0905ccb5f050", "Model in white wearing diamond bracelet, rings and layered necklaces"),

  /* Editorial & bridal */
  looseDiamonds: img("1599707367072-cd6ada2bc375", "Loose brilliant-cut diamonds on a dark surface"),
  goldBars: img("1610375461246-83df859d849d", "Gleaming bars of fine gold"),
  stonesBowl: img("1610663711502-35f870cfaea2", "Ceramic bowl of polished stones in sculptural light"),
  ringsPlate: img("1561828995-aa79a2db86dd", "Rings arranged on a ceramic plate in natural light"),
  ringsBox: img("1584302179602-e4c3d3fd629d", "Gold rings resting on an ivory jewelry box"),
  flatlay: img("1606760227091-3dd870d97f1d", "Collection of fine jewelry pieces arranged on a table"),
  bridalMonochrome: img("1460978812857-470ed1c77af0", "Bride and groom embracing on a windswept shore in black and white"),
  bridalPeonyRings: img("1515934751635-c81c6bc9a2d8", "Wedding rings resting on blush peonies"),
  bridalHands: img("1529634806980-85c3dd6d34ac", "Couple holding hands showing an engagement ring and bouquet"),
  brideBeach: img("1537633552985-df8429e8048b", "Bride with a cathedral veil by the sea"),
  brideBouquet: img("1519741497674-611481863552", "Bride holding a bouquet in warm evening light"),
  bridalGown: img("1594552072238-b8a33785b261", "Bridal gown displayed in a sunlit suite"),
  bridalHeels: img("1518049362265-d5b2a6467637", "Crystal-embellished bridal heels"),
} satisfies Record<string, ProductImage>;

export type ImageKey = keyof typeof images;
