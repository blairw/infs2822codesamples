import geopandas

# https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202016?OpenDocument
# Get "Postal Areas ASGS Ed 2016 Digital Boundaries in ESRI Shapefile Format"
shp_file = geopandas.read_file('POA_2016_AUST.shp')
shp_file.to_file('au-postcodes.geojson', driver='GeoJSON')