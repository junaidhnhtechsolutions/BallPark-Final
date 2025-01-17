import Particles from "../ui/particles";

export default function NavDescription() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#00083c] via-[#00083c] relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={100}
        color={"#ffffff"}
        refresh
      />
      <div className="max-w-5xl mx-auto p-6 pt-20 z-30 example  h-fit overflow-hidden relative">
        <h1 className="text-3xl font-semibold text-white">MAKE AN ACCOUNT</h1>
        <p className="text-lg text-white mb-10">
          Head over to LOGIN and CREATE A NEW ACCOUNT.
        </p>

        <h2 className="text-2xl font-semibold text-white">
          Onceasdas you’re all set up head over to NEW PROJECT and name your
          project.
        </h2>
        <p className="text-lg text-white mb-10">
          Once on the new projects page there are three options to choose from:
          Cost a drawing, project pictures, and start a quote.
        </p>

        <h2 className="text-2xl font-semibold text-white">COST A DRAWING</h2>
        <p className="text-lg text-white mb-10">
          Putting an end to painstakingly costing your technical drawings.
        </p>

        <h3 className="text-xl font-semibold text-white">
          HOW TO GET THE BEST ESTIMATES FOR YOUR PICTURES
        </h3>

        <h4 className="text-lg font-semibold text-white">
          DIMENSIONS ARE A MUST
        </h4>
        <p className="text-base text-white ">
          Let’s start with the basics: dimensions. Unfortunately, our cost
          engine isn’t psychic (as much as we wish it were). If you want an
          accurate ballpark figure, make sure every measurement is clearly
          marked on your drawing.
        </p>
        <p className="text-base text-white">
          Even if it’s a simple square, label every side. The engine won’t just
          assume all sides are equal—it needs the facts!
        </p>
        <p className="text-base text-white mb-10">
          We have added a feature that means when you upload a picture, you can
          also add on dimensions that may have not been included to help with
          sizing.
        </p>

        <h4 className="text-lg font-semibold text-white">
          MULTIPLE ANGLES = BETTER RESULTS
        </h4>
        <p className="text-base text-white ">
          If you can provide more than one angle of your drawing, you’re on the
          right track! Remember, our engine can’t see what’s not there.
        </p>
        <p className="text-base text-white">
          For instance, if you’re designing a double-sided bench but only
          provide one view, how’s it supposed to guess what’s happening on the
          other side? And if there’s no plan view, how can it tell how thick
          it’s supposed to be?
        </p>
        <p className="text-base text-white mb-10">
          You can still submit a single view, but be warned: the less detail we
          have, the broader the estimate—and that means more work later on to
          fine-tune it.
        </p>

        <h4 className="text-lg font-semibold text-white">
          LABEL YOUR MATERIALS
        </h4>
        <p className="text-base text-white">
          Just like you would with a client, make sure to note down the
          materials you’re using. 18mm MDF or 25mm MDF? Trust us, the difference
          matters if you want an accurate quote.
        </p>

        <p className="text-base text-white">
          Check out the examples below to see the difference between a solid
          ballpark estimate and a looser one.
        </p>

        <p className="text-base text-white">
          Now you know the rules, it's as simple as uploading or dragging and
          dropping the picture into the clearly marked engine. The engine will
          begin crunching numbers and then will give you a breakdown of all the
          materials with quantities and where to purchase them. As we mentioned
          earlier, it’s always a good idea to do a quick sense check—especially
          depending on how detailed your drawing was. There is an option to
          purchase the material next to the breakdown.
        </p>

        <p className="text-base text-white mb-10">
          You then label the drawing and click ‘save’ and it will save into the
          ‘Project Pictures’ folder.
        </p>

        <h2 className="text-2xl font-semibold text-white">PROJECT DRAWINGS</h2>
        <p className="text-lg text-white mb-10">
          This is where these pictures are stored with their price estimate.
        </p>

        <h2 className="text-2xl font-semibold text-white">MAKE A QUOTE</h2>
        <p className="text-lg text-white">
          This is where everything comes together.
        </p>
        <p className="text-base text-white mb-10">
          If you’re here you’re probably already familiar with the basics of
          writing a quote but just in case you’re not: Item (what you're
          quoting), Quantity (how many you need), Cost (the price), and Markup
          (how much you want to add for profit).
        </p>

        <h3 className="text-xl font-semibold text-white">DROP DOWN OPTIONS</h3>

        <h4 className="text-lg font-semibold text-white">
          PROJECT PICTURES DROP DOWN
        </h4>
        <p className="text-base text-white mb-10">
          This drop down option is where you can easily upload your project
          picture costs. Click on it, go to the next cell, and type in the name
          from your saved project pictures. We'll automatically break things
          down into materials for you, so you can adjust quantities, add your
          own markup, and even purchase everything you need with a simple click.
        </p>

        <h4 className="text-lg font-semibold text-white">
          OFF THE SHELF DROP DOWN
        </h4>
        <p className="text-base text-white">
          Let’s be honest, no one wants to spend hours sketching out every
          single item on a quote. That’s just extra time we could all use for
          more exciting things, right?
        </p>
        <p className="text-base text-white mb-10">
          That's why we've put together a collection of commonly used unbespoke
          items you can easily pop into your quotes. We’ve got everything from
          standard-sized canvas-wrapped step and repeats to podiums and flats,
          and so much more! Each item comes with a handy breakdown of the
          materials and where you can get the material or simply purchase the
          item off the shelf. Again, there is the option to mark up these line
          items anywhere from 1 to 100 percent.
        </p>

        <h4 className="text-lg font-semibold text-white">
          BALLPARK 2.0 DROP DOWN
        </h4>
        <p className="text-base text-white">
          If you haven't checked out our Ballpark 2.0 tab yet, that’s probably
          worth a look.
        </p>
        <p className="text-base text-white">
          Ballpark 2.0 is an app that links to your account and lets you snap
          pictures of real-life objects. It then works its magic to size them up
          and estimate costs. Just take a few photos from different angles, and
          our AI will do its best to break down the materials and give you a
          ballpark cost estimate.
        </p>

        <p className="text-base text-white">
          Now, it's not perfect—sometimes it won't get the exact material—but
          it'll pick the closest match it can find for you to replicate. And
          while it can't see the inner workings of a structure, it does a solid
          job estimating based on what it can see. So, you might need to use
          your builder's intuition to fill in the gaps.
        </p>

        <p className="text-base text-white mb-10">
          Once you take a picture of the object on the app click ‘save’ and it
          will be saved into the ‘Ballpark 2.0’ tab you saw on the beginning
          page. Later when you’re at your laptop working on the quote you’ll be
          able to click the Ballpark 2.0 drop down and click ‘memory’ and import
          the materials from the picture you took earlier.
        </p>

        <h4 className="text-lg font-semibold text-white">MATERIALS</h4>
        <p className="text-base text-white">
          So, you’re getting ready to dive into your project, but the thought of
          sketching out a 1220 x 2440mm triangle on Dibond or MDF every single
          time sounds like a major hassle, right?
        </p>
        <p className="text-base text-white">
          Lucky for you, once you step into the Ballpark, you’ve got the keys to
          our entire material’s costing kingdom. No more researching current
          prices—we’ve got all the numbers and locations ready and waiting for
          you.
        </p>
        <p className="text-base text-white mb-10">
          Just hit that ‘Materials’ drop-down, type in your quantities, and
          voilà! You’re all set and again with the link for you to purchase it.
        </p>

        <h4 className="text-lg font-semibold text-white">FREESTYLE</h4>
        <p className="text-base text-white mb-10">
          This drop down allows you to manually enter whatever you’d like to the
          quote. For example your personal install fees or workshop labour etc.
        </p>

        <h3 className="text-xl font-semibold text-white">IMPORTANT NOTES</h3>

        <h4 className="text-lg font-semibold text-white">
          For Set Build Companies:
        </h4>
        <p className="text-base text-white mb-10">
          Got your ballpark cost estimate? Great! Ready to move forward? Just
          click ‘purchase’ next to each material, and you’ll be taken directly
          to the site where we found the cost. For more bespoke elements—like a
          custom piece of metal—we suggest marking up the material cost by 50%
          again, since you might need to outsource it.
        </p>

        <h4 className="text-lg font-semibold text-white">For Agencies:</h4>
        <p className="text-base text-white">
          If you’re teaming up with set build companies to bring your designs to
          life, remember that these estimates will need a little extra
          padding—typically anywhere from 10% to 50%, depending on the company.
          So, when you’re planning a budget for an event, we recommend marking
          it up by 50% just to be safe. And don’t forget to add a line item for
          workshop labour, which can vary depending on the company, as that’s
          where set builders really earn their keep.
        </p>
      </div>
    </div>
  );
}
