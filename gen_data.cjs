const fs = require('fs');

const users = [
  { id:'admin1', name:'System Admin', location:'Colombo', phone:'0112345678', rating:5.0, reviewCount:100, avatar:'AD', isVerified:true, nic:'198012345678', password:'admin', email:'admin@renttool.lk', role:'admin' },
  { id:'u1', name:'Kasun Perera', location:'Colombo 05', phone:'0771234567', rating:4.9, reviewCount:12, avatar:'KP', isVerified:true, nic:'199512345678', password:'kasun123', email:'kasun@email.com', role:'user' },
  { id:'u2', name:'Nimal Silva', location:'Kandy', phone:'0719876543', rating:4.7, reviewCount:5, avatar:'NS', isVerified:false, nic:'', password:'nimal123', email:'nimal@email.com' },
  { id:'u3', name:'Dilini Fernando', location:'Maharagama', phone:'0765554433', rating:5.0, reviewCount:8, avatar:'DF', isVerified:true, nic:'199298765432', password:'dilini123', email:'dilini@email.com' },
  { id:'u4', name:'Ruwan Bandara', location:'Gampaha', phone:'0772345678', rating:4.6, reviewCount:7, avatar:'RB', isVerified:true, nic:'198845678901', password:'ruwan123', email:'ruwan@email.com' },
  { id:'u5', name:'Chamara Jayasinghe', location:'Galle', phone:'0713456789', rating:4.8, reviewCount:10, avatar:'CJ', isVerified:true, nic:'199123456789', password:'chamara123', email:'chamara@email.com' },
  { id:'u6', name:'Pradeep Weerasinghe', location:'Matara', phone:'0764567890', rating:4.5, reviewCount:6, avatar:'PW', isVerified:false, nic:'', password:'pradeep123', email:'pradeep@email.com' },
  { id:'u7', name:'Sanjeewa Kumara', location:'Kurunegala', phone:'0775678901', rating:4.7, reviewCount:9, avatar:'SK', isVerified:true, nic:'197867890123', password:'sanjeewa123', email:'sanjeewa@email.com' },
  { id:'u8', name:'Malini Ratnayake', location:'Negombo', phone:'0716789012', rating:4.9, reviewCount:11, avatar:'MR', isVerified:true, nic:'199534567890', password:'malini123', email:'malini@email.com' },
  { id:'u9', name:'Thilak Dissanayake', location:'Anuradhapura', phone:'0767890123', rating:4.4, reviewCount:4, avatar:'TD', isVerified:false, nic:'', password:'thilak123', email:'thilak@email.com' },
  { id:'u10', name:'Sumudu Liyanage', location:'Ratnapura', phone:'0778901234', rating:4.8, reviewCount:13, avatar:'SL', isVerified:true, nic:'199012345678', password:'sumudu123', email:'sumudu@email.com' },
  { id:'u11', name:'Buddhika Samaraweera', location:'Badulla', phone:'0719012345', rating:4.6, reviewCount:3, avatar:'BS', isVerified:true, nic:'198956789012', password:'buddhika123', email:'buddhika@email.com' },
  { id:'u12', name:'Hasitha Gunasekara', location:'Trincomalee', phone:'0760123456', rating:4.7, reviewCount:8, avatar:'HG', isVerified:true, nic:'199345678901', password:'hasitha123', email:'hasitha@email.com' },
  { id:'u13', name:'Asanka Rodrigo', location:'Jaffna', phone:'0771235678', rating:4.5, reviewCount:5, avatar:'AR', isVerified:false, nic:'', password:'asanka123', email:'asanka@email.com' },
  { id:'u14', name:'Upali Wickramasinghe', location:'Kalutara', phone:'0712346789', rating:4.9, reviewCount:14, avatar:'UW', isVerified:true, nic:'197723456789', password:'upali123', email:'upali@email.com' },
  { id:'u15', name:'Deepa Madusanka', location:'Polonnaruwa', phone:'0763457890', rating:4.8, reviewCount:6, avatar:'DM', isVerified:true, nic:'199678901234', password:'deepa123', email:'deepa@email.com' }
];

const provinces = {
  'Colombo 05':  { mapX:45, mapY:35 },
  'Kandy':       { mapX:30, mapY:65 },
  'Maharagama':  { mapX:65, mapY:55 },
  'Gampaha':     { mapX:40, mapY:28 },
  'Galle':       { mapX:50, mapY:82 },
  'Matara':      { mapX:55, mapY:88 },
  'Kurunegala':  { mapX:25, mapY:48 },
  'Negombo':     { mapX:38, mapY:22 },
  'Anuradhapura':{ mapX:20, mapY:40 },
  'Ratnapura':   { mapX:35, mapY:70 },
  'Badulla':     { mapX:60, mapY:68 },
  'Trincomalee': { mapX:55, mapY:32 },
  'Jaffna':      { mapX:18, mapY:12 },
  'Kalutara':    { mapX:48, mapY:72 },
  'Polonnaruwa': { mapX:45, mapY:48 }
};

// [id, title, category, ownerId, location, rate, deposit, rating, description]
const raw = [
  ['t1','Demolition Jackhammer','Power Tools','u1','Colombo 05',3500,8000,4.9,'2200W electric jackhammer. Concrete breaking and tile removal. Chisels included.'],
  ['t2','Angle Grinder 9 inch','Power Tools','u4','Gampaha',1500,4000,4.7,'Heavy duty 2200W angle grinder. Cutting and grinding discs included.'],
  ['t3','Rotary Hammer Drill','Power Tools','u7','Kurunegala',2000,5000,4.8,'SDS-Plus rotary hammer. Drills concrete and masonry with ease.'],
  ['t4','Electric Circular Saw','Power Tools','u10','Ratnapura',1800,4500,4.6,'185mm blade circular saw. Clean straight cuts in wood and plywood.'],
  ['t5','Cordless Impact Driver','Power Tools','u14','Kalutara',1200,3000,4.7,'18V Li-Ion impact driver with 2 batteries. High torque fastening.'],
  ['t6','Reciprocating Saw','Power Tools','u5','Galle',1600,4000,4.8,'13A reciprocating saw. Demolition and pruning. 5 blades included.'],
  ['t7','Jigsaw Electric','Power Tools','u8','Negombo',1000,2500,4.5,'Pendulum jigsaw for curved cuts. 10 blade set included.'],
  ['t8','Belt Sander 4 inch','Power Tools','u11','Badulla',1400,3500,4.6,'690W belt sander. Smooth wood surfaces fast. Belt rolls included.'],
  ['t9','Random Orbital Sander','Power Tools','u3','Maharagama',900,2000,4.7,'Palm sander with dust bag. Ideal for finishing furniture.'],
  ['t10','Bench Grinder 8 inch','Power Tools','u1','Colombo 05',1100,3000,4.5,'Twin wheel bench grinder. Sharpen chisels and drill bits.'],
  ['t11','Heat Gun 2000W','Power Tools','u4','Gampaha',800,2000,4.6,'Variable temp heat gun. Paint stripping and PVC bending.'],
  ['t12','Router Electric 2HP','Power Tools','u7','Kurunegala',1700,4000,4.8,'2HP plunge router with 10-piece bit set. Perfect for cabinetry.'],
  ['t13','Tile Cutter Electric','Power Tools','u5','Galle',2200,5500,4.9,'Wet tile cutter. Diamond blade for ceramic and porcelain tiles.'],
  ['t14','Wall Chaser Machine','Power Tools','u2','Kandy',2500,6000,4.7,'Dual blade wall chaser for electrical cable channels.'],
  ['t15','Heavy Demolition Breaker','Power Tools','u10','Ratnapura',4000,9000,4.8,'10kg electric demolition breaker. Breaks reinforced concrete fast.'],
  ['t16','Drywall Screwdriver','Power Tools','u13','Jaffna',700,1500,4.5,'Auto feed drywall screwdriver. Install plasterboard quickly.'],
  ['t17','Planer Electric','Power Tools','u8','Negombo',1300,3200,4.6,'750W electric planer. 2mm depth, 82mm width. Ideal for doors.'],
  ['t18','Car Orbital Polisher','Power Tools','u15','Polonnaruwa',1000,2500,4.7,'900W dual action orbital polisher. Restore car paint shine.'],
  ['t19','Oscillating Multi-Tool','Power Tools','u6','Matara',1100,2800,4.6,'Oscillating multi-tool. Sanding, cutting in tight spaces.'],
  ['t20','Air Compressor 50L','Power Tools','u12','Trincomalee',2800,7000,4.8,'50L air compressor 2HP. Powers nail guns and spray guns.'],
  ['t21','Concrete Mixer 350L','Heavy Machinery','u1','Colombo 05',5000,12000,4.9,'Electric concrete mixer 350L capacity. Mixes concrete in minutes.'],
  ['t22','Plate Compactor Petrol','Heavy Machinery','u4','Gampaha',6000,14000,4.8,'Petrol plate compactor. Compacts soil, gravel and asphalt.'],
  ['t23','Electric Jackhammer 65lb','Heavy Machinery','u14','Kalutara',5500,13000,4.7,'65lb demolition hammer. Breaks up driveways and foundations.'],
  ['t24','Concrete Vibrator','Heavy Machinery','u7','Kurunegala',2500,6000,4.6,'Electric concrete vibrator 35mm head. Removes air bubbles.'],
  ['t25','Generator 7kVA Petrol','Heavy Machinery','u5','Galle',8000,20000,4.9,'7kVA portable generator. Powers construction site equipment.'],
  ['t26','Submersible Water Pump','Heavy Machinery','u2','Kandy',3000,7000,4.7,'2 inch submersible pump. Removes flood water fast.'],
  ['t27','Centrifugal Water Pump','Heavy Machinery','u10','Ratnapura',3500,8000,4.6,'3 inch surface pump. Irrigation and construction site use.'],
  ['t28','Concrete Road Saw','Heavy Machinery','u3','Maharagama',7000,15000,4.8,'14 inch diamond blade road cutter. For roads and slabs.'],
  ['t29','Welding Machine 200A','Heavy Machinery','u8','Negombo',3000,7000,4.7,'Arc welder 200A. Welding electrode set and mask included.'],
  ['t30','Mini Cement Mixer 140L','Heavy Machinery','u11','Badulla',2500,6000,4.5,'140L portable mini cement mixer. Light enough to carry upstairs.'],
  ['t31','Core Drill Rig','Heavy Machinery','u1','Colombo 05',8000,18000,4.9,'Diamond core drill rig. Drills reinforced concrete walls.'],
  ['t32','Electric Pallet Jack','Heavy Machinery','u12','Trincomalee',5000,12000,4.6,'Electric pallet jack 2 ton. Move heavy loads in warehouse.'],
  ['t33','Portable Scissor Lift','Heavy Machinery','u5','Galle',9000,20000,4.8,'3m portable scissor lift. Safe aerial work at height.'],
  ['t34','Block and Tackle Hoist','Heavy Machinery','u6','Matara',2000,5000,4.5,'1 ton chain hoist. Lift heavy machinery and engines.'],
  ['t35','Pressure Grouting Machine','Heavy Machinery','u15','Polonnaruwa',6000,14000,4.7,'Electric grouting pump. Waterproofing and crack injection.'],
  ['t36','Grass Trimmer Petrol','Gardening','u3','Maharagama',1200,3000,4.8,'2-stroke petrol grass trimmer. Full fuel tank included.'],
  ['t37','Lawn Mower Self-Propelled','Gardening','u4','Gampaha',2000,5000,4.7,'Self-propelled lawn mower 18 inch cut. Grass bag included.'],
  ['t38','Hedge Trimmer Electric','Gardening','u8','Negombo',1000,2500,4.6,'550W hedge trimmer 45cm blade. Neat hedge and shrub cutting.'],
  ['t39','Garden Tiller Cultivator','Gardening','u5','Galle',3000,7000,4.8,'Petrol rotary tiller. Breaks new ground for garden beds.'],
  ['t40','Chainsaw 16 inch Petrol','Gardening','u7','Kurunegala',3500,8000,4.9,'Petrol chainsaw 16 inch bar. Tree felling and log cutting.'],
  ['t41','Leaf Blower Backpack','Gardening','u10','Ratnapura',1400,3500,4.7,'Petrol backpack blower. Clears leaves and debris quickly.'],
  ['t42','Garden Water Pump','Gardening','u2','Kandy',1800,4000,4.5,'1HP garden water pump. Irrigation and pond circulation.'],
  ['t43','Electric Pruning Shears','Gardening','u13','Jaffna',800,2000,4.6,'Li-Ion electric pruning shear. Cuts branches up to 30mm.'],
  ['t44','Soil Aerator Roller','Gardening','u14','Kalutara',1500,3500,4.5,'Manual lawn aerator roller. Improves grass root growth.'],
  ['t45','Backpack Sprayer 16L','Gardening','u11','Badulla',600,1500,4.7,'Manual backpack sprayer 16L. Pesticide and fertilizer spray.'],
  ['t46','Wood Chipper Electric','Gardening','u15','Polonnaruwa',4000,9000,4.8,'2500W electric wood chipper. Turns branches into mulch.'],
  ['t47','Broadcast Seeder Spreader','Gardening','u6','Matara',700,1800,4.4,'Push broadcast spreader. Seeds and fertilizes lawns evenly.'],
  ['t48','High Pressure Washer 140B','Cleaning','u2','Kandy',1800,5000,4.6,'140 Bar pressure washer. Foam bottle and nozzles included.'],
  ['t49','Industrial Wet Dry Vacuum','Cleaning','u4','Gampaha',1500,3500,4.7,'30L wet and dry vacuum. Construction dust and water pickup.'],
  ['t50','Steam Cleaner Floor','Cleaning','u8','Negombo',1200,3000,4.8,'Floor steam cleaner. Kills bacteria, removes stubborn stains.'],
  ['t51','Carpet Extractor Machine','Cleaning','u3','Maharagama',2000,5000,4.6,'Carpet deep cleaner. Hot water extraction method.'],
  ['t52','Pressure Washer 200 Bar','Cleaning','u1','Colombo 05',2500,6000,4.9,'200 Bar pressure washer. Industrial cleaning power.'],
  ['t53','Floor Scrubber Machine','Cleaning','u7','Kurunegala',3000,7000,4.7,'Walk behind floor scrubber. Tile and concrete cleaning.'],
  ['t54','Gutter Cleaning Vacuum Kit','Cleaning','u5','Galle',500,1200,4.4,'Gutter vac attachment kit for standard wet dry vac.'],
  ['t55','Pool Vacuum Cleaner','Cleaning','u10','Ratnapura',1000,2500,4.6,'Manual pool vacuum head and pole set.'],
  ['t56','16-Step Aluminium Ladder','Ladders','u1','Colombo 05',1000,4000,4.7,'Multi-purpose folding ladder. 16 feet extended height.'],
  ['t57','Extension Ladder 20ft','Ladders','u4','Gampaha',1500,4500,4.6,'20 foot aluminium extension ladder. Anti-slip rubber feet.'],
  ['t58','Scaffold Tower 5m','Ladders','u14','Kalutara',4000,10000,4.8,'Aluminium scaffold tower 5m. Wide platform with guard rail.'],
  ['t59','Attic Access Ladder 3m','Ladders','u7','Kurunegala',800,2000,4.5,'Folding attic ladder 3m. Easy ceiling hatch installation.'],
  ['t60','Trestle Sawhorse Pair','Ladders','u5','Galle',600,1500,4.6,'Adjustable sawhorse pair. Holds timber and sheet materials.'],
  ['t61','Roof Ladder Hook','Ladders','u2','Kandy',700,1800,4.4,'Roof ridge hook ladder. Safe roof access for repairs.'],
  ['t62','Platform Step Ladder 6ft','Ladders','u8','Negombo',900,2200,4.7,'Wide platform step ladder. Large non-slip work platform.'],
  ['t63','Combination Multi Ladder','Ladders','u11','Badulla',1300,3500,4.8,'Multi-use combination ladder 4x3. Step, extension and lean modes.'],
  ['t64','Diamond Tile Drilling Set','Hand Tools','u3','Maharagama',400,1000,4.6,'10-piece diamond tile drilling set. Fits standard drills.'],
  ['t65','Pipe Wrench Set','Hand Tools','u6','Matara',500,1200,4.5,'14 inch and 18 inch pipe wrench set. Chrome steel.'],
  ['t66','Masonry Chisel Set','Hand Tools','u13','Jaffna',300,800,4.4,'8-piece cold and masonry chisel set. Concrete and stone.'],
  ['t67','Chalk Line and Level Kit','Hand Tools','u15','Polonnaruwa',350,900,4.5,'Chalk line reel and 4 foot spirit level combo.'],
  ['t68','Block and Bench Plane Set','Hand Tools','u12','Trincomalee',400,1000,4.6,'Adjustable block plane and bench plane set.'],
  ['t69','Punch and Drift Set','Hand Tools','u2','Kandy',250,600,4.4,'Pin punches and drift set. 12 pieces in roll case.'],
  ['t70','Digital Stud Finder','Hand Tools','u4','Gampaha',500,1200,4.7,'Digital stud finder. Locates studs, wires and pipes in walls.'],
  ['t71','Digital Angle Finder','Hand Tools','u1','Colombo 05',400,1000,4.6,'Digital angle protractor. Accurate to 0.1 degrees.'],
  ['t72','Hand Saw Set Fine','Hand Tools','u7','Kurunegala',300,800,4.5,'3-piece hand saw set. Rip, cross cut and pruning saws.'],
  ['t73','G-Clamp Set 6 piece','Hand Tools','u8','Negombo',350,900,4.6,'G-clamp and bar clamp set. Wood gluing and metal work.'],
  ['t74','Cable Pulling Machine','Electrical','u1','Colombo 05',3000,7000,4.8,'Electric cable pulling machine. 500m drum capacity.'],
  ['t75','Digital Multimeter Pro','Electrical','u4','Gampaha',600,1500,4.7,'True RMS digital multimeter. Current, voltage, resistance.'],
  ['t76','Conduit Bender Electric','Electrical','u7','Kurunegala',2000,5000,4.6,'Electric conduit bender. Bends EMT and rigid conduit.'],
  ['t77','Wire Stripper Crimper Set','Electrical','u14','Kalutara',400,1000,4.5,'Professional wire stripper and crimp tool set.'],
  ['t78','Circuit Breaker Finder','Electrical','u5','Galle',700,1800,4.6,'Digital circuit breaker finder. No breaker flipping needed.'],
  ['t79','Non-Contact Voltage Tester','Electrical','u2','Kandy',350,900,4.7,'Non-contact AC voltage tester pen. Live wire detection.'],
  ['t80','Cable Drum Reel 50m','Electrical','u10','Ratnapura',500,1200,4.5,'50m heavy duty extension reel. 13A socket.'],
  ['t81','Thermal Imaging Camera','Electrical','u12','Trincomalee',5000,12000,4.9,'Thermal imaging camera. Detects hot spots in panels.'],
  ['t82','3x360 Green Laser Level','Electrical','u3','Maharagama',2500,6000,4.8,'360 degree green laser level with tripod. 3-plane.'],
  ['t83','Fish Tape Wire Puller 30m','Electrical','u6','Matara',600,1500,4.5,'30m steel fish tape. Pulls wire through conduit and walls.'],
  ['t84','Electric Pipe Threader','Plumbing','u1','Colombo 05',4000,9000,4.8,'Electric pipe threader. Threads 1/2 to 2 inch steel pipe.'],
  ['t85','Motorized Drain Snake','Plumbing','u8','Negombo',2000,5000,4.7,'Electric drain auger 15m. Clears blocked drains.'],
  ['t86','Pipe Freezing Kit','Plumbing','u5','Galle',1500,3500,4.5,'Pipe freezing spray kit. Stops flow without shutting off.'],
  ['t87','MAPP Gas Plumbing Torch','Plumbing','u4','Gampaha',800,2000,4.6,'MAPP gas torch kit. Soldering copper pipes safely.'],
  ['t88','Pressure Test Pump','Plumbing','u7','Kurunegala',1200,3000,4.7,'Hand pressure test pump. Tests pipe pressure to 60 bar.'],
  ['t89','Copper PVC Pipe Cutter Set','Plumbing','u13','Jaffna',400,1000,4.5,'Copper and PVC pipe cutter set. Clean burr-free cuts.'],
  ['t90','Toilet Closet Auger','Plumbing','u11','Badulla',600,1500,4.4,'Closet auger 900mm. Clears toilet blockages without damage.'],
  ['t91','Sewer Camera Inspection','Plumbing','u15','Polonnaruwa',5000,12000,4.9,'30m sewer camera. Live video of underground pipe condition.'],
  ['t92','Hydraulic Pipe Bender','Plumbing','u2','Kandy',3000,7000,4.7,'Hydraulic pipe bender. Bends conduit and copper pipe cleanly.'],
  ['t93','Table Saw 10 inch','Woodworking','u14','Kalutara',5000,12000,4.8,'10 inch table saw. Rip fence and mitre gauge included.'],
  ['t94','Bandsaw 14 inch','Woodworking','u7','Kurunegala',4000,10000,4.7,'14 inch bandsaw. Resawing and curved cuts in thick timber.'],
  ['t95','Scroll Saw Electric','Woodworking','u5','Galle',2000,5000,4.6,'Electric scroll saw. Intricate fretwork and decorative cuts.'],
  ['t96','Mortising Machine Benchtop','Woodworking','u12','Trincomalee',3000,7000,4.7,'Benchtop mortising machine. Square holes for joinery.'],
  ['t97','Wood Lathe 12 inch','Woodworking','u3','Maharagama',4500,10000,4.8,'Variable speed wood lathe. Bowls, spindles and table legs.'],
  ['t98','Biscuit Joiner Plate','Woodworking','u8','Negombo',1200,3000,4.5,'Plate joiner with biscuit assortment. Strong panel joints.'],
  ['t99','Pocket Hole Jig System','Woodworking','u1','Colombo 05',800,2000,4.7,'Pocket hole jig kit. Fast strong furniture joints.'],
  ['t100','Dovetail Jig Router Set','Woodworking','u4','Gampaha',1500,3500,4.8,'Dovetail jig with router guide. Classic furniture joinery.'],
];

const tools = raw.map(([id,title,category,ownerId,loc,rate,deposit,rating,description]) => {
  const pos = provinces[loc] || { mapX:40, mapY:50 };
  return {
    id, title, category, ownerId, description, rate, deposit,
    location: loc, mapX: pos.mapX, mapY: pos.mapY,
    availability: 'available', rating,
    health: { motor:'100% Operational', cable:'Safety Tested', bit:'Cleaned', sanitized:'Verified Disinfected' },
    reviews: []
  };
});

const categories = ['All','Power Tools','Heavy Machinery','Gardening','Cleaning','Ladders','Hand Tools','Electrical','Plumbing','Woodworking'];

const output = `// Auto-generated seed data — ${tools.length} tools, ${users.length} users
export const INITIAL_USERS = ${JSON.stringify(users, null, 2)};

export const INITIAL_TOOLS = ${JSON.stringify(tools, null, 2)};

export const CATEGORIES = ${JSON.stringify(categories)};
`;

fs.writeFileSync('src/data.js', output);
console.log('Done: ' + tools.length + ' tools, ' + users.length + ' users');
