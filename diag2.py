import asyncio
from playwright.async_api import async_playwright
async def go():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':1440,'height':900})
        msgs=[]
        pg.on('console', lambda m: msgs.append(f"{m.type}: {m.text[:160]}"))
        pg.on('pageerror', lambda e: msgs.append(f"PAGEERROR: {str(e)[:200]}"))
        await pg.goto('http://localhost:5173/fangram/',wait_until='networkidle')
        await pg.wait_for_timeout(3000)
        info = await pg.evaluate("""()=>{
          const c=document.querySelector('.hero-canvas canvas');
          return { hasCanvas: !!c, w: c?c.width:0, h: c?c.height:0,
                   gl: c? !!(c.getContext('webgl2')||c.getContext('webgl')) : 'no-canvas' };
        }""")
        print("CANVAS:", info)
        print("--- console ---")
        for m in msgs[-25:]: print(m)
        await b.close()
asyncio.run(go())
