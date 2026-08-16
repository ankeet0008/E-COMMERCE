// Ankit Ki Dukan — Curated Furniture & Living Collection
const PRODUCTS = [
  // SOFAS
  {
    id: 1,
    name: 'Amalfi Corner Sofa',
    category: 'Sofas',
    price: 1959,
    sku: 'AKD-SF-0101',
    stock: 12,
    dimensions: '280 × 165 × 78 cm',
    weight: '72 kg',
    description: 'Modular corner sofa in soft, textured fabric. Generous seat depth, premium pocket-spring cushioning, and discrete solid wood legs for relaxed living in minimalist interiors.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBthKnwjH3GYT5YjP6oIO7cerfGsqDUvmBv5pMgTYta1InGHROh-50A0bUx4rs5TD8WyKd3fOxCwH2O-uo5ijWALCrmGdpwlvgKkzD7Bl_yGN_cPG6_VsMnoZQk_QpWGl4Jh26Y0mO7gbnTMf13nGepZS3nJ7N71NVh2iFCd0dw9Pj6ss9SI5CM2QfhuBU3rOEgTPIlQyIJqfjvN8bj0CjbASLbxCRrEfzIs1ii4KE2Uh9Jf9ghcmnn',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBthKnwjH3GYT5YjP6oIO7cerfGsqDUvmBv5pMgTYta1InGHROh-50A0bUx4rs5TD8WyKd3fOxCwH2O-uo5ijWALCrmGdpwlvgKkzD7Bl_yGN_cPG6_VsMnoZQk_QpWGl4Jh26Y0mO7gbnTMf13nGepZS3nJ7N71NVh2iFCd0dw9Pj6ss9SI5CM2QfhuBU3rOEgTPIlQyIJqfjvN8bj0CjbASLbxCRrEfzIs1ii4KE2Uh9Jf9ghcmnn',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2G-aaosbdDOQw3irPpGJrJc4J7mwHC3mYvBEcQK8u1kSNaq1yqJpJ_wlRq9O8HPSu8mdNxEdXFFcp2CsrY02TZjKnLAxu5tSodUrWlHSByTo7S2uEvTgenikD6dDtkVopF8VB4cxpLWpDEZyFpYzsgtzQo64MzCnZZq0fuCJTBsS6gUnP310HMSbsZVazDj-5bRzpkz3CmUi_c_cuAcUFn9MAHQEJCK8AEUBSrKkzjtsxgkkAef8Y'
    ],
    status: 'In Stock',
    featured: true
  },
  {
    id: 2,
    name: 'Cielo 3-Seater Sofa',
    category: 'Sofas',
    price: 1819,
    sku: 'AKD-SF-0102',
    stock: 8,
    dimensions: '220 × 95 × 76 cm',
    weight: '58 kg',
    description: 'Sleek 3-seater sofa with architectural lines in light greige upholstery. Timeless editorial aesthetics meet soft tactile comfort and durable spring support.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB27ZJl5f2H-b27AfDMwhPTFuHEVeNKiHlsCIyMdCo33T3m7VzjAwr3QfFVx-gJjLLh7mMF6vNRMjKxczbh6KyyPTi1AOmEW93GzXEbtrpvlldar9eYEdF7rzlZ-YZ8zawllJVYwcUJf3McbeUV4XsQvFahKneVl4VTJVutQ9rtvpmgKXy_ngMln395pVfIF8LTlZz5ZEk3C5_BvDZ2MY7xcbbzn-HoG8XrGWUCBpHho_fGCBqZJkol',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB27ZJl5f2H-b27AfDMwhPTFuHEVeNKiHlsCIyMdCo33T3m7VzjAwr3QfFVx-gJjLLh7mMF6vNRMjKxczbh6KyyPTi1AOmEW93GzXEbtrpvlldar9eYEdF7rzlZ-YZ8zawllJVYwcUJf3McbeUV4XsQvFahKneVl4VTJVutQ9rtvpmgKXy_ngMln395pVfIF8LTlZz5ZEk3C5_BvDZ2MY7xcbbzn-HoG8XrGWUCBpHho_fGCBqZJkol',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqqPPUdF1Jak7MpceOG2O5bAxVqOEelN510CiQ1YF_qToRYUa4OfpORMdgLjmjpwM_whQrgWrZ7Mgz4BjQ4kO5PYGwmKkqRKc8yuV359Y_vtkO12_0yk2bxpGEEp-7lsEhccmjDrLr8HNg7o1kWSKY2EL4IEIoJwa6USexzJvAC9wbPqZEFPs292t22Cj5V6vnxCHK1CEKXkGczj8TyhPvr6RlwKRUPbW7seDwP-UYAtPlpjhJSZy-'
    ],
    status: 'In Stock',
    featured: true
  },

  // ARMCHAIRS & LOUNGE
  {
    id: 3,
    name: 'Plush Bouclé Armchair',
    category: 'Armchairs',
    price: 329,
    sku: 'AKD-AC-0201',
    stock: 0,
    dimensions: '82 × 80 × 75 cm',
    weight: '16 kg',
    description: 'Cozy cream bouclé armchair with an organic, rounded silhouette. Creates an inviting, peaceful corner in living rooms and reading nooks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATuCP_VYYWKHmayenWgtNZZccgGj3k4LR84A-kqL0xhVjm_OuDZoq5Hcbng40OBb1tUeWg8BP2etaHAe5D3H68IzCAAo2fNKXBSprHhdVEavJI0RZPS_VUmXuSQB0dM25J75c1kS1S2siEWaTfajiaj9xfAPjyqwTazXCI2XSK4ajRzJqYkJHvUrUWIrG6ghvHtwBl743dL_m5SaABdVo3xbh2qWbI3UxTgOaYKh25EfpHJOpwP9w8',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATuCP_VYYWKHmayenWgtNZZccgGj3k4LR84A-kqL0xhVjm_OuDZoq5Hcbng40OBb1tUeWg8BP2etaHAe5D3H68IzCAAo2fNKXBSprHhdVEavJI0RZPS_VUmXuSQB0dM25J75c1kS1S2siEWaTfajiaj9xfAPjyqwTazXCI2XSK4ajRzJqYkJHvUrUWIrG6ghvHtwBl743dL_m5SaABdVo3xbh2qWbI3UxTgOaYKh25EfpHJOpwP9w8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZP5JRRgX0fEBFe6k7X_0iNMZHPsX4NIaqQgknN6D6NYHu-Mp0_d2uGQ0pRZo0DIH8BE5gX-rW-W38SWlpGeNGnsFcQP97Yc2o1Yho4gN1fhMQO3CCICvp2efgdKBlWCV42yMbkHGn7Xr6ASBk0v7amGz1umiCAvP-51srrORV8OX6-UmT9PDVQVIrmVd0RIhohLo1B9-ZIXOm8hbWk8T-3pnV9CJPe1ZtORgkNd7Yrnw4fYBJ2Tvz'
    ],
    status: 'Out of Stock',
    featured: true
  },
  {
    id: 4,
    name: 'Saga Bouclé Lounge Chair',
    category: 'Armchairs',
    price: 580,
    sku: 'AKD-AC-0202',
    stock: 14,
    dimensions: '88 × 84 × 78 cm',
    weight: '19 kg',
    description: 'Sculptural lounge chair featuring an exposed solid wood frame and generously padded off-white textured bouclé upholstery.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHIq-ocX-8pZeLRSS_pV2ItpWD9RiP4LQpDX_ySrAtjpxQd7rd7ld3Ii6t2fBWJCHljbazIyB25JegEE-Iy-Y5DwQPRtcq8dkHlpG8ftq4ZLvPrFPCJvaTq72xJCBrE9zYF0Y1TcTtGmC6xvnzluRYRD3TlXEy7CO3lHfnK0XGS_DXGr7wggAPO5cifL1aqp8hri5H5mB2tnABz-9O6vXgf_VrFOmeQWOv06iZesPsLjNPNYTr2HhE',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHIq-ocX-8pZeLRSS_pV2ItpWD9RiP4LQpDX_ySrAtjpxQd7rd7ld3Ii6t2fBWJCHljbazIyB25JegEE-Iy-Y5DwQPRtcq8dkHlpG8ftq4ZLvPrFPCJvaTq72xJCBrE9zYF0Y1TcTtGmC6xvnzluRYRD3TlXEy7CO3lHfnK0XGS_DXGr7wggAPO5cifL1aqp8hri5H5mB2tnABz-9O6vXgf_VrFOmeQWOv06iZesPsLjNPNYTr2HhE'
    ],
    status: 'In Stock',
    featured: true
  },

  // CHAIRS
  {
    id: 5,
    name: 'Polly Oak Dining Chair',
    category: 'Chairs',
    price: 209,
    sku: 'AKD-CH-0301',
    stock: 28,
    dimensions: '52 × 50 × 82 cm',
    weight: '6.5 kg',
    description: 'Masterfully crafted dining chair made from light solid oak. Clean architectural profile with an ergonomically curved backrest.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzIJoJH1cf87Rj9cdB4JZb1Wfnho0KCT3cBpXa5P_obK3IgJgKtuYvm7TfnEzErV37rDiPZyjspzEYRq-82qUqiRGQlH8FAAtPFQOrkqI4eu9XCwBYBJ_xnjD8OMYfVGab-igSBwAc4dsTXlXG9lJLffDE3-_ZbMI92ne2xPbq9a7j37g-GTL52lOqDdxGkzscMsM0KPRwoUnX7QwbqyFR5v4kmf3WAymdYrZMa_KAWd74PvsyDhIy',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzIJoJH1cf87Rj9cdB4JZb1Wfnho0KCT3cBpXa5P_obK3IgJgKtuYvm7TfnEzErV37rDiPZyjspzEYRq-82qUqiRGQlH8FAAtPFQOrkqI4eu9XCwBYBJ_xnjD8OMYfVGab-igSBwAc4dsTXlXG9lJLffDE3-_ZbMI92ne2xPbq9a7j37g-GTL52lOqDdxGkzscMsM0KPRwoUnX7QwbqyFR5v4kmf3WAymdYrZMa_KAWd74PvsyDhIy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHKSldPDSyyObhiCItRpbMHRu-cbkQcQUuYr3DkKx9qoaqAENMchlFFyIen5XygdeTSwk3CLem4PNAI6PKLS7mSn01bY1S3HkvwRODm0nlH15znXXSYNQN6NirVZEQ-a6lru4byEEExANfYZPMmzpiwgvZy5aL-xLPG9waphx0Sn90iDM5XJgK41L13-KJMEBeh5YSp4LYLo-ZXvpPES6vVr7p0wDzanH-cdpQPXPtSYHlFzfvU5zy'
    ],
    status: 'In Stock',
    featured: true
  },

  // DINING TABLES
  {
    id: 6,
    name: 'Lenox Round Dining Table',
    category: 'Dining Tables',
    price: 799,
    sku: 'AKD-TB-0401',
    stock: 7,
    dimensions: 'Ø 120 × 75 cm',
    weight: '34 kg',
    description: 'Round dining table crafted from dark stained ash wood. Comfortably accommodates 4 to 6 people, serving as a warm center for everyday gathering.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy93mHkXxdM-uU-UqznjzM9GFVpoHk2jhmqtJJEyuLCZq6ULTOSZD2MVLpCeM8beQJ0y-ZFMy5ZWYPm7PxIkUqfmwukcYQOiBtQqrvkv5q5jhqWSTbSjhWXzyl5CSOBk-HT6x_U_IdMafR8QnCiVSzylbG4Wqa2Lui5fuhyEhR45hmowyu-SKoUqzEwIK02-hX8y1DsmjQu9l9zTWFVovmona_Kp1aQAFcmY-rw5UsqWogyDUOL8nJ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAy93mHkXxdM-uU-UqznjzM9GFVpoHk2jhmqtJJEyuLCZq6ULTOSZD2MVLpCeM8beQJ0y-ZFMy5ZWYPm7PxIkUqfmwukcYQOiBtQqrvkv5q5jhqWSTbSjhWXzyl5CSOBk-HT6x_U_IdMafR8QnCiVSzylbG4Wqa2Lui5fuhyEhR45hmowyu-SKoUqzEwIK02-hX8y1DsmjQu9l9zTWFVovmona_Kp1aQAFcmY-rw5UsqWogyDUOL8nJ'
    ],
    status: 'In Stock',
    featured: true
  },
  {
    id: 7,
    name: 'Burgundy Sculptural Dining Table',
    category: 'Dining Tables',
    price: 920,
    sku: 'AKD-TB-0402',
    stock: 5,
    dimensions: 'Ø 130 × 75 cm',
    weight: '42 kg',
    description: 'Striking pedestal dining table in deep rich burgundy with a monolithic cylindrical base. An architectural centerpiece for dining rooms.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcQhp38CTuCln75rID7_omTyPSPKwWhZCefPZADGFkJD4HSn7cUcNGQ-2dnLPHjBjXSb1VXPhGqJ8Q9Z7gmqCF4uZZSRCsM54NtCV-__DCAWBlALORwpEIhxI_zaH-D80CBEW39knApt-a24TBp_53cG4esIWX_B5SndmXmV1iEQdmoQXZWX8sOnTHgfyCvD8ctlmF6JZOWAadBrrCTD_oMrPwndB3qRvLl8v_yddBHlQXhpXoDvDN',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcQhp38CTuCln75rID7_omTyPSPKwWhZCefPZADGFkJD4HSn7cUcNGQ-2dnLPHjBjXSb1VXPhGqJ8Q9Z7gmqCF4uZZSRCsM54NtCV-__DCAWBlALORwpEIhxI_zaH-D80CBEW39knApt-a24TBp_53cG4esIWX_B5SndmXmV1iEQdmoQXZWX8sOnTHgfyCvD8ctlmF6JZOWAadBrrCTD_oMrPwndB3qRvLl8v_yddBHlQXhpXoDvDN'
    ],
    status: 'In Stock',
    featured: true
  },

  // RUGS
  {
    id: 8,
    name: 'Organic Shape Wool Rug',
    category: 'Rugs',
    price: 179.90,
    sku: 'AKD-RG-0501',
    stock: 19,
    dimensions: '200 × 300 cm',
    weight: '11 kg',
    description: 'Hand-woven virgin wool rug with fluid organic contours in neutral earthy tones. Adds instant tactile warmth, comfort, and character to any floor.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUEj-1B274tA_Nr9vwqovzDbaFK2eMEEwjTXh6451TBxE_-bVoAH-112pHcPHSfd0qwhP0HL7wBGAMfgf4OnRneRxSwIur5D28kZzuvu_9aT3GBcT-0uuPaNrYS8Q7zUFfxyK89nU_y3NjIoeMJRrqX4Z62S0_5itpiNOKRmsBa-q1KCUWiQHP8XkVcj1a4TiU8vqnJXuGlwm8yCWHmsRGPTVsz5hjXw6m7Xl9eBmSJoFR_l2mvngI',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUEj-1B274tA_Nr9vwqovzDbaFK2eMEEwjTXh6451TBxE_-bVoAH-112pHcPHSfd0qwhP0HL7wBGAMfgf4OnRneRxSwIur5D28kZzuvu_9aT3GBcT-0uuPaNrYS8Q7zUFfxyK89nU_y3NjIoeMJRrqX4Z62S0_5itpiNOKRmsBa-q1KCUWiQHP8XkVcj1a4TiU8vqnJXuGlwm8yCWHmsRGPTVsz5hjXw6m7Xl9eBmSJoFR_l2mvngI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpiwPf6JBWPqjkHD7Viq99kEI7VSUGNUTDezXVULBco4B6Hw87GpDIPxAGAw4bVZv-LTPPsLeCt4QCEKjXU4xUo9U_BgGTGMpGG2ENTptsX1JMJ8RuHVrJ_y0RS4n1CrDgWOAoVkiQC4ZSMo9sIiDyXCR-M6FbDUXlz3tf1zZEHX-uaxi1kqhS0plsUKOE8oEkQte-nyg2UNq8t6D86kuCTQLesrZLMkGev9mNz-6ocTEnRkmcDhk7'
    ],
    status: 'In Stock',
    featured: true
  },

  // MIRRORS
  {
    id: 9,
    name: 'Organic Wave Wall Mirror',
    category: 'Mirrors',
    price: 149.00,
    sku: 'AKD-MR-0601',
    stock: 22,
    dimensions: '90 × 60 × 2.5 cm',
    weight: '5.2 kg',
    description: 'Asymmetrical wavy wall mirror with subtle polished edging. Gently reflects natural ambient light and expands modern living spaces.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOS8RnEsQsqnGDe98YLaF4hflPBff7TvOQpgtX3VbuYV8d8_0iARjA0XvUfze6e5pOEx1uvRQ8zApc_hySRlfJI00NCZ1-Qv4mXMdsE_OYjU_pJmnbYHxL7xt0KrK4NEyMnIxy8bo3UxD2p6a3Jo5Y4H42mW0AZmwZf5g71rs4aJ1gMl4XYBx7tzL32L_Be7xWiS9spjRPJAp4nlRriyoD5lqgHxpQa2rdhoCo7kRCbjOjb6NAWIuK',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOS8RnEsQsqnGDe98YLaF4hflPBff7TvOQpgtX3VbuYV8d8_0iARjA0XvUfze6e5pOEx1uvRQ8zApc_hySRlfJI00NCZ1-Qv4mXMdsE_OYjU_pJmnbYHxL7xt0KrK4NEyMnIxy8bo3UxD2p6a3Jo5Y4H42mW0AZmwZf5g71rs4aJ1gMl4XYBx7tzL32L_Be7xWiS9spjRPJAp4nlRriyoD5lqgHxpQa2rdhoCo7kRCbjOjb6NAWIuK'
    ],
    status: 'In Stock',
    featured: true
  },

  // STORAGE
  {
    id: 10,
    name: 'Copenhagen Minimalist Wardrobe',
    category: 'Storage',
    price: 890.00,
    sku: 'AKD-ST-0701',
    stock: 9,
    dimensions: '100 × 50 × 180 cm',
    weight: '48 kg',
    description: 'Matte coral-pink wardrobe cabinet with clean architectural lines, minimalist timber handles, and versatile shelving layout.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZKoWXOgmSk6OaeDYbEgy99t1-Z1AMhWp06cB1uMlUpNPQxE3dAQNLFce9kzyvlCUY4zLhV8hLuzJtX0o3PZxfCV2IKbQCw6f7BDtXEs9GYugFJsuZp0yo8KFctzWMM5wEV3bDC9SL6Ce1QPthE25aAaXNt495R-EGjqbyhXVS_vfPB1W3kSBKc5BpPL-Ylm7_UYVPYP4Y7o7k0UQ8PUuMr-i-BIscjwjBOecHznnLpjmbZMVQiuSh',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZKoWXOgmSk6OaeDYbEgy99t1-Z1AMhWp06cB1uMlUpNPQxE3dAQNLFce9kzyvlCUY4zLhV8hLuzJtX0o3PZxfCV2IKbQCw6f7BDtXEs9GYugFJsuZp0yo8KFctzWMM5wEV3bDC9SL6Ce1QPthE25aAaXNt495R-EGjqbyhXVS_vfPB1W3kSBKc5BpPL-Ylm7_UYVPYP4Y7o7k0UQ8PUuMr-i-BIscjwjBOecHznnLpjmbZMVQiuSh'
    ],
    status: 'In Stock',
    featured: false
  },

  // BEDS
  {
    id: 11,
    name: 'Nuvola Upholstered Bed',
    category: 'Beds',
    price: 1250.00,
    sku: 'AKD-BD-0801',
    stock: 6,
    dimensions: '180 × 200 cm Mattress Size',
    weight: '62 kg',
    description: 'Minimalist upholstered bed frame in soft greige linen with a cushioned headboard. Creates a restful sanctuary for calm nights.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcNnRwpAiD77FrsAmaHh-CxYHPxuPjaWEhclgsDvAlVK3q7f8LcUDWm2NR4zczDd4JE4pXem6x0yGxck-LgmDtVt0brW6qBqHGPOuUSBUDv4kLuVLbdKcPiddj9MmbY8HZd9jMRHOZyLi1vdexa7LP0hLjslnW6Ms2jqv0lVOqCMe0r76lx-3TD-Uv7xvPHuekjxXncJjoDlLqY8AF0x21HuHJCdQpw83athwANZIsUXa6pxDrjHId',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcNnRwpAiD77FrsAmaHh-CxYHPxuPjaWEhclgsDvAlVK3q7f8LcUDWm2NR4zczDd4JE4pXem6x0yGxck-LgmDtVt0brW6qBqHGPOuUSBUDv4kLuVLbdKcPiddj9MmbY8HZd9jMRHOZyLi1vdexa7LP0hLjslnW6Ms2jqv0lVOqCMe0r76lx-3TD-Uv7xvPHuekjxXncJjoDlLqY8AF0x21HuHJCdQpw83athwANZIsUXa6pxDrjHId'
    ],
    status: 'In Stock',
    featured: false
  },

  // DINING SETS
  {
    id: 12,
    name: 'Solid Oak Dining Set & 4 Chairs',
    category: 'Dining Sets',
    price: 1490.00,
    sku: 'AKD-DS-0901',
    stock: 4,
    dimensions: 'Table 160 × 90 cm, 4 Chairs',
    weight: '55 kg',
    description: 'Complete dining room set in oiled solid natural oak wood. Timeless craftsmanship and clean minimalist silhouettes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2sYaT7W1-GhmnuIWJZANqoTunJE10Cmg2ClLe9z9SA11RV6daLMx_W30-9okv9oFtXFEbiCRWbk0-48iQKNPfM0HR40WfWTxi_0HE6Bst2PIFXcljni0tVjGSAgmm-vaWjZgFv_MIlxColxAK4YvyN5Qz1e4Ro0kq5TpZvFR03uM_KcU6Kop3eajG5QDVvRq_S_oBukZI9cs9F1feocyIXBR53aTSh9f7jCtwwHxAkofBxmqmgQi',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2sYaT7W1-GhmnuIWJZANqoTunJE10Cmg2ClLe9z9SA11RV6daLMx_W30-9okv9oFtXFEbiCRWbk0-48iQKNPfM0HR40WfWTxi_0HE6Bst2PIFXcljni0tVjGSAgmm-vaWjZgFv_MIlxColxAK4YvyN5Qz1e4Ro0kq5TpZvFR03uM_KcU6Kop3eajG5QDVvRq_S_oBukZI9cs9F1feocyIXBR53aTSh9f7jCtwwHxAkofBxmqmgQi'
    ],
    status: 'In Stock',
    featured: false
  }
];

export default PRODUCTS;

// Derived category data
export const CATEGORIES = (() => {
  const map = {};
  PRODUCTS.forEach(p => {
    if (!map[p.category]) {
      map[p.category] = {
        name: p.category,
        count: 0,
        totalStock: 0,
        image: p.image
      };
    }
    map[p.category].count++;
    map[p.category].totalStock += p.stock;
  });
  return Object.values(map);
})();

export function getProduct(id) {
  return PRODUCTS.find(p => p.id === parseInt(id, 10));
}

export function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

export function formatPrice(price) {
  if (price === undefined || price === null) return '$0.00';
  return '$' + Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
