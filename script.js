am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  
  
  var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
  var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

  const categories = [
    {
    "id": 1,
    "name": "yeah",
    "children": []
    },
    {
    "id": 2,
    "name": "ok"
    },
    {
    "id": 3,
    "name": "tag"
    },
    {
    "id": 4,
    "name": "hey"
    },
    {
    "id": 5,
    "name": "ya"
    },
    {
    "id": 6,
    "name": "hu"
    },
    {
    "id": 7,
    "name": "d"
    }
    ]

  categories.forEach(element => {
    axios.get(`http://localhost:8081/api/articles/byCategories?categories=${element.id}`)
    .then(function (response) {
      // handle success
      articles = response.data
      let articleArray = []
      articles.forEach(element => {
        let articlesIds = {}
        articlesIds.name = element.title
        articleArray.push(articlesIds)
      })
      element.children = articleArray
    })
  })
  console.log(categories)
  //chart.data = categories
  console.log(chart.data)

  chart.data = [
    {id : 1, name : "yeah", children: [{name: "cool"}]}
  ]

  /*chart.data = [
        {
          name: "First",
          children: [
            { name: "A1", views: 100 },
            { name: "A2", views: 60 }
          ],
          color : "#fff"
        },
        {
          name: "Second",
          children: [
            { name: "B1", views: 135 },
            { name: "B2", views: 98 },
          ],
          linkWith: ["C2"],
          color : "#fff"
        },
        {
          name: "Third",
          children: [
            { name: "C2", views: 148},
            { name: "C4", views: 26 }
          ],
          color : "#fff"
        },
        {
          name: "Fourth",
          children: [
            { name: "D1", views: 415 },
            { name: "D2", views: 148 },
            { name: "D3", views: 89 }
          ],
          color : "#fff"
        },
        {
          name: "Fifth",
          children: [
            {
              name: "E2",
              views: 148
            }
          ],
          color : "#fff"
        }
  ];*/
  networkSeries.dataFields.id = "name";
  networkSeries.dataFields.linkWith = "linkWith"; 
  networkSeries.dataFields.value = "views";
  networkSeries.dataFields.name = "name";
  networkSeries.dataFields.children = "children";
  networkSeries.nodes.template.tooltipText = "{name}:{value}";
  networkSeries.nodes.template.fillOpacity = 1;
  networkSeries.dataFields.color = "color";

  
  
  networkSeries.nodes.template.label.text = "{name}"
  networkSeries.fontSize = 10;
  
  networkSeries.links.template.strokeWidth = 1;
  
  var hoverState = networkSeries.links.template.states.create("hover");
  hoverState.properties.strokeWidth = 3;
  hoverState.properties.strokeOpacity = 1;
  
  networkSeries.nodes.template.events.on("over", function(event) {
    event.target.dataItem.childLinks.each(function(link) {
      link.isHover = true;
    })
    if (event.target.dataItem.parentLink) {
      event.target.dataItem.parentLink.isHover = true;
    }
  
  })
  
  networkSeries.nodes.template.events.on("out", function(event) {
    event.target.dataItem.childLinks.each(function(link) {
      link.isHover = false;
    })
    if (event.target.dataItem.parentLink) {
      event.target.dataItem.parentLink.isHover = false;
    }
  })
  
  });